/*

Run this script: (node v10+)

node create.mjs 2018css --test

*/

const YAML = require('yamljs')
const fs = require('fs')
const fetch = require('node-fetch')

const surveyName = process.argv[2]
console.log(`// Generating survey for ${surveyName}`)

// test mode means don't create survey on Typeform
const isTest = process.argv[3] === '--test'

const outline = YAML.load(`./surveys/${surveyName}/outline.yaml`)
const survey = YAML.load(`./surveys/${surveyName}/survey.yaml`)
const templates = {
    // section template
    section: fs.readFileSync('./templates/section.yaml', 'utf8'),

    // question templates
    tool: fs.readFileSync('./templates/tool.yaml', 'utf8'),
    rating: fs.readFileSync('./templates/rating.yaml', 'utf8'),
    other: fs.readFileSync('./templates/other.yaml', 'utf8'),
    multiple: fs.readFileSync('./templates/multiple.yaml', 'utf8'),
    text: fs.readFileSync('./templates/text.yaml', 'utf8'),
    longtext: fs.readFileSync('./templates/longtext.yaml', 'utf8'),
    email: fs.readFileSync('./templates/email.yaml', 'utf8'),
    opinion: fs.readFileSync('./templates/opinion.yaml', 'utf8'),
    feature: fs.readFileSync('./templates/feature.yaml', 'utf8'),
    condition: fs.readFileSync('./templates/condition.yaml', 'utf8'),
    statictext: fs.readFileSync('./templates/statictext.yaml', 'utf8'),

    // logic templates
    logic: fs.readFileSync('./templates/logic.yaml', 'utf8'),
    conditionLogic: fs.readFileSync('./templates/conditionLogic.yaml', 'utf8')
}

/*

Replace all occurences of a string

*/
// eslint-disable-next-line no-extend-native
String.prototype.replaceAll = function(search, replacement) {
    const target = this
    return target.replace(new RegExp(search, 'g'), replacement)
}

/*

Take a string ("Front-end") and make it usable as an ID ("frontend")

*/
const makeId = s =>
    s
        .replaceAll(' ', '')
        .replaceAll('-', '')
        .toLowerCase()

/*

Take a section title and question title and get a unique id

*/
const getId = (sectionTitle, questionTitle) => {
    return sectionTitle ? makeId(sectionTitle) + '_' + makeId(questionTitle) : makeId(questionTitle)
}

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

For any given section ID, figure out the ID of the following question

*/
let sectionsTable = []
outline.forEach(section => {
    const id = section.id || makeId(section.title)
    sectionsTable.push({ ...section, id })
})
const getNextSection = id => {
    const currentSectionIndex = sectionsTable.findIndex(section => section.id === id)
    const nextSection =
        currentSectionIndex === sectionsTable.length - 1
            ? null
            : sectionsTable[currentSectionIndex + 1]
    return nextSection
}

/*

For any given question ID, figure out the ID of the following question

*/
const generateQuestionPathsTable = surveyOutline => {
    const paths = []
    let i = 0
    surveyOutline.forEach((section, sectionIndex) => {
        section.questions &&
            section.questions.forEach((question, questionIndex) => {
                if (typeof question === 'string') {
                    const [title, id = getId(section.title, title)] = question.split('|')
                    paths[i] = { title, id, path: `${sectionIndex + 1}_${questionIndex + 1}` }
                } else {
                    const { title, id = getId(section.title, title) } = question
                    paths[i] = { title, id, path: `${sectionIndex + 1}_${questionIndex + 1}` }
                }
                i++
            })
    })
    return paths
}
const pathsTable = generateQuestionPathsTable(outline)
const getNextQuestion = id => {
    const questionIndex = pathsTable.findIndex(q => q.id === id)
    return pathsTable[questionIndex + 1]
}

/*

Get the JSON object for a given question object

*/
const getQuestionJSON = (section, question) => {
    const defaultQuestionObject = {
        allowother: true,
        allowmultiple: true,
        randomize: true
    }

    let questionObject

    if (typeof question === 'string') {
        // if question is specified as string, get its template from parent section
        questionObject = {
            title: question,
            id: getId(section.title, question),
            template: section.template
        }
        // exception: "other" questions should use "other" template
        if (question === 'other') {
            questionObject.title = section.title
            questionObject.template = 'other'
        }
    } else {
        // if question has an explicit id, it will overwrite `questionId`
        const questionId = getId(section.title, question.title)
        questionObject = { id: questionId, ...question }
    }

    const { description, options, template } = questionObject

    const questionsJSON = parseYAML(templates[template], {
        ...defaultQuestionObject,
        ...questionObject
    })

    if (!Array.isArray(questionsJSON)) {
        if (options) {
            questionsJSON.properties.choices = convertToChoices(options)
        }
        if (description) {
            questionsJSON.properties.description = description
        }
    }
    return questionsJSON
}

/*

1. Generate survey JSON

Note: we treat "library" questions differently in order to avoid having to specify
their template in the YAML file. Other questions are specified more explicitely.

*/
outline.forEach(section => {
    if (!section.questions) {
        // handle single questions first
        const questionJSON = getQuestionJSON({}, section)
        survey.fields.push(questionJSON)
    } else {
        // get section name and ID and create section object
        const sectionId = section.id || makeId(section.title)
        const sectionVariables = { ...section, id: sectionId }
        const sectionObject = parseYAML(templates.section, sectionVariables)

        if (section.condition) {
            const conditionJSON = parseYAML(templates.condition, {
                title: section.condition,
                id: `${sectionId}_condition`
            })
            // survey.fields.push(conditionJSON)
            sectionObject.properties.fields.push(conditionJSON)
            const nextSection = getNextSection(sectionId)
            if (nextSection) {
                const firstQuestionId = getId(section.title, section.questions[0])
                const conditionLogicJSON = parseYAML(templates.conditionLogic, {
                    sectionId,
                    next: nextSection.id,
                    firstQuestion: firstQuestionId
                })
                survey.logic = survey.logic.concat(conditionLogicJSON)
            }
        }

        section.questions.forEach(question => {
            const questionsJSON = getQuestionJSON(section, question)

            if (Array.isArray(questionsJSON)) {
                // we're adding multiple questions at once
                sectionObject.properties.fields = sectionObject.properties.fields.concat(
                    questionsJSON
                )
            } else {
                // we're adding a single question
                sectionObject.properties.fields.push(questionsJSON)
            }

            // TODO: re-enable adding custom logic
            // // add logic templates directly to survey.logic
            // const logic = parseYAML(templates.logic, libraryVariables)
            // survey.logic = survey.logic.concat(logic)
        })

        // add section to survey
        survey.fields.push(sectionObject)
    }
})

/*

2. Save it to file for easier debugging

*/
fs.writeFile(
    `./surveys/${surveyName}/survey-output.json`,
    JSON.stringify(survey, null, 2),
    () => {}
)

/*

3. Generate Typeform form

*/
if (!isTest) {
    const createFormURL = 'https://api.typeform.com/forms'
    const token = '4jiHqGkdkJhcyGpS5f2HXLXBqLwh4CEMzZCU73irjn4e'

    const timestamp = new Date()

    // eslint-disable-next-line max-len
    survey.title = `${surveyName}_${timestamp.getMonth() +
        1}/${timestamp.getDate()}_${timestamp.getHours()}:${timestamp.getMinutes()}`
    // eslint-disable-next-line max-len
    fetch(createFormURL, {
        method: 'POST',
        body: JSON.stringify(survey),
        headers: { authorization: `bearer ${token}` }
    })
        .then(res => res.json())
        .then(json => console.log(json))
}
