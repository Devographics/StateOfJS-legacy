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
                pageTitle = mode === 'short' ? section.shortLabel || section.label : `${section.label} – Overview`
                break

            case 'Other Libraries':
                pageTitle = mode === 'short' ? 'Other Libraries' : `${section.label} – Other Libraries`
                break

            case 'Conclusion':
                pageTitle = mode === 'short' ? 'Conclusion' : `${section.label} – Conclusion`
                break

            default:
                pageTitle = mode === 'short' ? subSection.label : `${section.label} - ${subSection.label}`
                break
        }
    } else {
        pageTitle = section.label
    }
    return mode === 'full' ? `The State of JavaScript 2018: ${pageTitle}` : pageTitle
}

export default getPageTitle
