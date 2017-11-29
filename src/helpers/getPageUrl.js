import slugify from './slugify'

const getPageUrl = (section, subSection) => {
	let url = `/2017/${slugify(section)}/`
	if (subSection) {
		url +=`${slugify(subSection)}/`
	}
	return url
}

export default getPageUrl