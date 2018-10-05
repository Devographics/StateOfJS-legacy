import find from 'lodash/find'
import nav from '../data/nav.yaml'
import sections from '../data/sections.yaml'

const getPageTitle = (sectionName, subSectionName) => {
    let pageName = ''
    const section = find(nav, section => section.label === sectionName)
    if (section) {
        pageName += section.fullLabel
    } else {
        pageName += sectionName
    }
    if (subSectionName) {
        const subSection = sections[subSectionName]
        pageName += ` – ${subSection.fullLabel}`
    }
    return `The State of JavaScript 2018: ${pageName}`
}

export default getPageTitle
