import { getWording, getToolName } from './wording'

export const getPageLabel = (page, includeSectionName = false) => {
    if (page.type === 'tool') {
        if (includeSectionName === true) {
            return `${getWording(`nav.${page.section}`)} - ${getToolName(page.tool)}`
        }

        return getToolName(page.tool)
    }

    if (page.section !== undefined && includeSectionName === true) {
        return `${getWording(`nav.${page.section}`)} - ${getWording(`nav.${page.id}`)}`
    }

    return getWording(`nav.${page.id}`)
}

export const pageTitle = (page, mode = 'normal') => {
    if (page.type === 'custom') {
        return mode === 'full' ? `The State of JavaScript 2018: ${page.id}` : page.id
    }

    return `page_title.${page.id}`
}

/*

Mode: 
    - Short: React
    - Normal: Front-end Frameworks : React
    - Full: The State of JavaScript 2018: Front-end Frameworks : React

*/
const getPageTitle = ({ section, subSection }, mode = 'normal') => {
    let pageTitle = ''
    if (subSection) {
        switch (subSection.label) {
            case 'Overview':
                pageTitle =
                    mode === 'short'
                        ? section.shortLabel || section.label
                        : `${section.label} – Overview`
                break

            case 'Other Libraries':
                pageTitle = mode === 'short' ? 'Other' : `${section.label} – Other Libraries`
                break

            case 'Conclusion':
                pageTitle = mode === 'short' ? 'Conclusion' : `${section.label} – Conclusion`
                break

            default:
                pageTitle =
                    mode === 'short' ? subSection.label : `${section.label} - ${subSection.label}`
                break
        }
    } else {
        pageTitle = section.label
    }
    return mode === 'full' ? `The State of JavaScript 2018: ${pageTitle}` : pageTitle
}

export default getPageTitle
