const getTitle = ({ section, subSection }, short = false) => {
    let title = ''
    title = short ? section.label : section.label
    if (subSection) {
        title += ` – ${short ? subSection.label : subSection.label}`
    }
    return title
}

export default getTitle
