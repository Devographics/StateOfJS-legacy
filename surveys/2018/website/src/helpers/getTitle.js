const getTitle = (page, short = false) => {
    const { section, subSection } = page
    let title = ''
    title = short ? section.label : section.label
    if (subSection) {
        title += ` – ${short ? subSection.label : subSection.label}`
    }
    return title
}

export default getTitle
