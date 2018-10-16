const getPageTitle = ({ section, subSection }, full = false) => {
    let pageTitle = ''
    if (subSection) {
        switch (subSection.label) {
            case 'Overview':
                pageTitle = `${section.label} – Overview`
                break

            case 'Other Libraries':
                pageTitle = `${section.label} – Other Libraries`
                break

            case 'Conclusion':
                pageTitle = `${section.label} – Conclusion`
                break

            default:
                pageTitle = `${section.label} - ${subSection.label}`
                break
        }
    } else {
        pageTitle = section.label
    }
    return full ? `The State of JavaScript 2018: ${pageTitle}` : pageTitle
}

export default getPageTitle
