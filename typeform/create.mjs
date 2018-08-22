/*

Run this script:

node --experimental-modules create.mjs

*/

const YAML = require('yamljs')
const fs = require('fs')
const fetch = require('node-fetch')

const outline = YAML.load('./templates/outline.yaml')
const survey = YAML.load('./templates/survey.yaml')
const sectionTemplate = fs.readFileSync('./templates/section.yaml', 'utf8')
const libraryTemplate = fs.readFileSync('./templates/library.yaml', 'utf8')
const logicTemplate = fs.readFileSync('./templates/logic.yaml', 'utf8')
const ratingTemplate = fs.readFileSync('./templates/rating.yaml', 'utf8')
const otherTemplate = fs.readFileSync('./templates/other.yaml', 'utf8')

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
    // eslint-disable-next-line no-param-reassign
    s = s.replaceAll(v.toUpperCase(), variables[v])
  })
  return YAML.parse(s)
}

/*

1. Generate survey JSON

*/
Object.keys(outline).forEach(sectionName => {
  // get section name and ID and create section object
  const sectionVariables = { name: sectionName, id: makeId(sectionName) }
  const section = parseYAML(sectionTemplate, sectionVariables)

  outline[sectionName].forEach(library => {
    const [name, id = makeId(name)] = library.split('|')
    const libraryVariables = { name, id }

    // add library questions to current section
    const questions = parseYAML(libraryTemplate, libraryVariables)
    section.properties.fields = section.properties.fields.concat(questions)

    // add logic directly to survey.logic
    const logic = parseYAML(logicTemplate, libraryVariables)
    survey.logic.push(logic)
  })

  // Add "other options" question
  const other = parseYAML(otherTemplate, sectionVariables)
  section.properties.fields.push(other)

  // Add rating question
  const rating = parseYAML(ratingTemplate, sectionVariables)
  section.properties.fields.push(rating)

  // add section to survey
  survey.fields.push(section)
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
