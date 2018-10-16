const getImageUrl = (page, chart) => {
    const { section, subSection } = page
    const prefix = `http://2018.stateofjs.com/images/captures/`
    const segments = [section.slug]
    if (subSection) {
        segments.push(subSection.slug)
    }
    if (chart) {
        segments.push(chart)
    }
    return `${prefix}${segments.join('_')}.png`
}

export default getImageUrl
