const getTitle = ({ section, subSection }, short = false) => {
    let title = ''
    title = short ? section.label : section.fullLabel
    if (subSection) {
        title += ` – ${short ? subSection.label : subSection.fullLabel}`
    }
    return title
}

export default getTitle