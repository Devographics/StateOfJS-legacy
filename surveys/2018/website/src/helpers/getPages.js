import slugify from './slugify'
import nav from '../data/nav.yaml'
import getPageTitle from './getPageTitle'
import getPageUrl from './getPageUrl'

const navFiltered = nav.filter(item => !item.hide)

/*

Take a section index and a subsection index and return a full page object

*/
export const createPage = (sectionIndex, subSectionIndex) => {
    const section = nav[sectionIndex]
    const page = {
        section: {
            ...section,
            index: sectionIndex,
            slug: slugify(section.label)
        }
    }
    if (typeof subSectionIndex !== 'undefined' && page.section.subPages && page.section.subPages[subSectionIndex]) {
        const subSectionLabel = page.section.subPages[subSectionIndex]
        page.subSection = {
            label: subSectionLabel,
            index: subSectionIndex,
            slug: slugify(subSectionLabel)
        }
    }
    page.url = getPageUrl(page)
    page.fullUrl = getPageUrl(page, true)
    page.title = getPageTitle(page)
    return page
}

/*

Get current page objectbased on path

*/
export const getCurrentPage = path => {
    const [, /* */ sectionSlug, subSectionSlug /* */] = path.split('/')
    const sectionIndex = nav.findIndex(
        item => item.path === path || slugify(item.label) === sectionSlug
    )
    const subSectionIndex =
        nav[sectionIndex].subPages &&
        nav[sectionIndex].subPages.findIndex(item => slugify(item) === subSectionSlug)
    const page = createPage(sectionIndex, subSectionIndex)
    return page
}

/*

Get previous page object based on current page

*/
export const getPreviousPage = ({ section, subSection }) => {
    if (subSection && subSection.index > 0) {
        // 1. previous page is in the same section
        return createPage(section.index, subSection.index - 1)
    } else {
        // 2a. first page of the results
        if (section.index === 0) {
            return null
        }
        // 2b. previous page is in another section
        const previousSectionIndex = section.index - 1
        const previousSection = navFiltered[previousSectionIndex]
        return createPage(
            previousSectionIndex,
            previousSection.subPages && previousSection.subPages.length - 1
        )
    }
}

/*

Get next page object based on current page

*/
export const getNextPage = ({ section, subSection }) => {
    if (subSection && subSection.index < section.subPages.length - 1) {
        // 1. next page is in the same section
        return createPage(section.index, subSection.index + 1)
    } else {
        // 2a. last page of the results
        if (section.index === navFiltered.length - 1) {
            return null
        }
        // 2b. next page is in another section
        const nextSectionIndex = section.index + 1
        return createPage(nextSectionIndex, 0)
    }
}

/*

Get current, previous, and next pages

*/
export const getPages = path => {
    const currentPage = getCurrentPage(path)
    if (currentPage.section.hide) {
        // page is outside "normal" sidebar nav
        return { currentPage }
    } else {
        const pages = {
            currentPage,
            previousPage: getPreviousPage(currentPage),
            nextPage: getNextPage(currentPage)
        }
        return pages
    }
}

/*

Get all page objects

*/
// export const getAllPages = () => {
//     const allPages = {}
//     nav.forEach((section, i) => {
//         if (section.subPages) {
//             section.subPages.forEach((subSection, j) => {
//                 allPages.push(createPage(i, j))
//             })
//         } else {
//             allPages.push(createPage(i))
//         }
//     })
//     return allPages
// }

export default getPages
