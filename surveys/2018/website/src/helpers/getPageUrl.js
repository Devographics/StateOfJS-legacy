import slugify from './slugify'

const getPageUrl = (page, isAbsolute = false) => {
    const { section, subSection } = page
    let url = `/${slugify(section.label)}/`
    if (subSection) {
        url += `${slugify(subSection.label)}/`
    }
    return isAbsolute ? `https://stateofjs.com/${url}` : url
}

export default getPageUrl
