const getPageUrl = (page, isAbsolute = false) => {
    const { section, subSection } = page
    let url = `/${section.slug}/`
    if (subSection) {
        url += `${subSection.slug}/`
    }
    return isAbsolute ? `https://stateofjs.com/${url}` : url
}

export default getPageUrl
