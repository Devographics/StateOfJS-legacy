/*

Run this script:

node --experimental-modules create.mjs

*/

const YAML = require('yamljs')
const fs = require('fs')
const fetch = require('node-fetch')

const outline = YAML.load('./templates/outline.yaml')
const survey = YAML.load('./templates/survey.yaml')
const templates = {
  section: fs.readFileSync('./templates/section.yaml', 'utf8'),
  library: fs.readFileSync('./templates/library.yaml', 'utf8'),
  logic: fs.readFileSync('./templates/logic.yaml', 'utf8'),
  rating: fs.readFileSync('./templates/rating.yaml', 'utf8'),
  other: fs.readFileSync('./templates/other.yaml', 'utf8'),
  multiple: fs.readFileSync('./templates/multiple.yaml', 'utf8'),
  text: fs.readFileSync('./templates/text.yaml', 'utf8'),
  longtext: fs.readFileSync('./templates/longtext.yaml', 'utf8'),
  email: fs.readFileSync('./templates/email.yaml', 'utf8'),
  opinion: fs.readFileSync('./templates/opinion.yaml', 'utf8'),
}

// test mode means don't create survey on Typeform
const isTest = process.argv[2] === '--test'

/*

Replace all occurences of a string

*/
// eslint-disable-next-line no-extend-native
String.prototype.replaceAll = function (search, replacement) {
  const target = this
  return target.replace(new RegExp(search, 'g'), replacement)
}

/*

Take a string ("Front-end") and make it usable as an ID ("frontend")

*/
const makeId = s => s.replaceAll(' ', '').replaceAll('-', '').toLowerCase()

/*

Parse a YAML string into JSON while replacing any variables

*/
const parseYAML = (s, variables) => {
  Object.keys(variables).forEach(v => {
    if (typeof variables[v] !== 'undefined') {
      // eslint-disable-next-line no-param-reassign
      s = s.replaceAll(v.toUpperCase(), variables[v])
    }
  })
  return YAML.parse(s)
}

/*

Take an array of strings and convert it into an array of Typeform-compatible choices

*/
const convertToChoices = options => options.map(option => ({ label: option }))

/*

For any given question ID, figure out the ID of the following question

*/
const generateQuestionPathsTable = (surveyOutline) => {
  const paths = []
  let i = 0
  surveyOutline.forEach((section, sectionIndex) => {
    section.questions.forEach((question, questionIndex) => {
      if (typeof question === 'string') {
        const [title, id = makeId(title)] = question.split('|')
        paths[i] = { title, id, path: `${sectionIndex+1}_${questionIndex+1}` }
      } else {
        const { title, id = makeId(title) } = question
        paths[i] = { title, id, path: `${sectionIndex+1}_${questionIndex+1}` }
      }
      i++
    })
  })
  return paths
}
const pathsTable = generateQuestionPathsTable(outline)
const getNextQuestion = (id) => {
  const questionIndex = pathsTable.findIndex(q => q.id === id)
  return pathsTable[questionIndex+1]
}
/*

1. Generate survey JSON

Note: we treat "library" questions differently in order to avoid having to specify
their template in the YAML file. Other questions are specified more explicitely.

*/
outline.forEach((section) => {
  // get section name and ID and create section object
  const sectionVariables = { ...section, id: section.id || makeId(section.title) }
  const sectionObject = parseYAML(templates.section, sectionVariables)

  section.questions.forEach((question) => {
    if (typeof question === 'object') {
      /*

      1a. `question` is an object, parse its template

      */
      // eslint-disable-next-line max-len
      const { title, id = makeId(title), template, description, options, allowother = true, allowmultiple = true, randomize = true } = question
      // eslint-disable-next-line max-len
      const questionJSON = parseYAML(templates[template], { title, id, description, allowother, allowmultiple })

      if (options) {
        questionJSON.properties.choices = convertToChoices(options)
      }
      if (description) {
        questionJSON.properties.description = description
      }
      sectionObject.properties.fields.push(questionJSON)
    } else {
      /*

      2. `question` is a string, treat it like a library/other/rating question

      */
      const [title, id = makeId(title)] = question.split('|')
      const nextQuestion = getNextQuestion(id)

      if (id === `${sectionVariables.id}_other`) {
        /*

        2a. "other options" question

        */
        const other = parseYAML(templates.other, sectionVariables)
        sectionObject.properties.fields.push(other)
      } else if (id === `${sectionVariables.id}_rating`) {
        /*

        2b. "rating" question

        */
        const rating = parseYAML(templates.rating, sectionVariables)
        sectionObject.properties.fields.push(rating)
      } else {
        /*

        2c. "library" question

        */
        const libraryVariables = { title, id, next: nextQuestion.id }

        // add library questions to current section
        const questions = parseYAML(templates.library, libraryVariables)
        sectionObject.properties.fields = sectionObject.properties.fields.concat(questions)

        // add logic templates directly to survey.logic
        const logic = parseYAML(templates.logic, libraryVariables)
        survey.logic = survey.logic.concat(logic)
      }
    }
  })

  // add section to survey
  survey.fields.push(sectionObject)
})

/*

2. Save it to file for easier debugging

*/
fs.writeFile('./survey-output.json', JSON.stringify(survey, null, 2), () => {})

/*

3. Generate Typeform form

*/
if (!isTest) {
  const createFormURL = 'https://api.typeform.com/forms'
  const token = 'EjgEahVHbf3ttJhHJuAFJVAnNAbUipmfquAUDCijz6Ly'

  const timestamp = new Date()

  // eslint-disable-next-line max-len
  survey.title = `State of JavaScript 2018_${timestamp.getMonth() + 1}/${timestamp.getDate()}_${timestamp.getHours()}:${timestamp.getMinutes()}`
  // eslint-disable-next-line max-len
  fetch(createFormURL, { method: 'POST', body: JSON.stringify(survey), headers: { authorization: `bearer ${token}` } })
    .then(res => res.json())
    .then(json => console.log(json))
}
