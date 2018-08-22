/* 

Run this script:

node --experimental-modules create.mjs

*/

const YAML = require('yamljs')
const fs = require('fs')
const fetch = require('node-fetch')

const outline = YAML.load('./outline.yaml')
const survey = YAML.load('./survey.yaml')
const sectionTemplate = fs.readFileSync('./section.yaml', 'utf8')
const questionTemplate = fs.readFileSync('./question.yaml', 'utf8')
const logicTemplate = fs.readFileSync('./logic.yaml', 'utf8')

// eslint-disable-next-line no-extend-native
String.prototype.replaceAll = function (search, replacement) {
  const target = this
  return target.replace(new RegExp(search, 'g'), replacement)
}

/*

1. Generate survey JSON

*/
Object.keys(outline).forEach(sectionName => {
  const section = YAML.parse(sectionTemplate.replaceAll('NAME', sectionName))

  outline[sectionName].forEach(library => {
    const [name, id] = library.split('|')
    const question = YAML.parse(questionTemplate.replaceAll('NAME', name).replaceAll('ID', id))
    const logic = YAML.parse(logicTemplate.replaceAll('ID', id))

    // add question(s) to current section
    section.properties.fields = section.properties.fields.concat(question)

    // add logic directly to survey.logic
    survey.logic.push(logic)
  })

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
const createFormURL = 'https://api.typeform.com/forms'
const token = 'EjgEahVHbf3ttJhHJuAFJVAnNAbUipmfquAUDCijz6Ly'

const timestamp = new Date()

survey.title = `State of JavaScript 2018_${timestamp.getMonth() + 1}/${timestamp.getDate()}_${timestamp.getHours()}:${timestamp.getMinutes()}`

fetch(createFormURL, { method: 'POST', body: JSON.stringify(survey), headers: { authorization: `bearer ${token}` } })
  .then(res => res.json())
  .then(json => console.log(json))
