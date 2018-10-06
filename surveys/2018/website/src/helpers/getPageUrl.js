import slugify from './slugify'

const getPageUrl = (section, subSection) => {
    let url = `/${slugify(section)}/`
    if (subSection) {
        url += `${slugify(subSection)}/`
    }
    return url
}

export default getPageUrl
