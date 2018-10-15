import slugify from './slugify'
import nav from '../data/nav.yaml'
import wording from '../data/wording.yml'
import getPageTitle from './getPageTitle'
import getPageUrl from './getPageUrl'

/*

Compare two paths with and without trailing slash

*/
export const removeTrailingSlash = s => (s.slice(-1) === '/' ? s.slice(0, -1) : s)
export const isSamePath = (p1, p2) =>
    p1 === p2 || removeTrailingSlash(p1) === p2 || p1 === removeTrailingSlash(p2)

/*

Take a section index and a subsection index and return a full page object

*/
export const createPage = (sectionIndex, subSectionIndex) => {
    const section = nav[sectionIndex]
    const page = {
        section: {
            ...section,
            label: wording.nav[section.id],
            index: sectionIndex,
            slug: section.id,
        }
    }
    if (
        typeof subSectionIndex !== 'undefined' &&
        page.section.subPages &&
        page.section.subPages[subSectionIndex]
    ) {
        const subSectionId = page.section.subPages[subSectionIndex]
        page.subSection = {
            id: subSectionId,
            slug: slugify(subSectionId),
            label: wording.nav[subSectionId] || subSectionId,
            index: subSectionIndex,
        }
    }
    // note: if section specifies its own path use that
    page.path = section.path || getPageUrl(page)
    page.url = getPageUrl(page, true)
    page.title = getPageTitle(page)
    return page
}

/*

Get current page objectbased on path

*/
export const getCurrentPage = path => {
    return getAllPages().find(p => isSamePath(p.path, path))
}

/*

Get previous page object based on current page

*/
export const getPreviousPage = page => {
    const allPages = getAllPages()
    return page.index > 0 && allPages[page.index - 1]
}

/*

Get next page object based on current page

*/
export const getNextPage = page => {
    const allPages = getAllPages()
    return page.index < allPages.length && allPages[page.index + 1]
}

/*

Get current, previous, and next pages

*/
export const getPrevNextPages = path => {
    const currentPage = getCurrentPage(path)
    if (!currentPage) {
        console.log('no current page!!')
        console.log(path)
        console.log(currentPage)
    } else {
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
}

/*

Get all page objects

*/
export const getAllPages = () => {
    const allPages = []
    const navFiltered = nav.filter(item => !item.hide)

    navFiltered.forEach((section, i) => {
        if (section.subPages) {
            section.subPages.forEach((subSection, j) => {
                const page = createPage(i, j)
                page.index = allPages.length
                allPages.push(page)
            })
        } else {
            const page = createPage(i)
            page.index = allPages.length
            allPages.push(page)
        }
    })
    return allPages
}

export default getPrevNextPages
