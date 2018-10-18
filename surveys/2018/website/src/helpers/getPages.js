import slugify from './slugify'
import nav from '../data/nav.yaml'
import wording from '../data/wording.yml'
import getPageTitle from './getPageTitle'
import getPageUrl from './getPageUrl'
import compact from 'lodash/compact'
import take from 'lodash/take'
import { getWording, getToolName } from './wording'

/*

Compare two paths based on their first n segments

*/
export const removeTrailingSlash = s => (s.slice(-1) === '/' ? s.slice(0, -1) : s)
export const splitCompactTake = (s, n) => take(compact(s.split('/')), n)
export const isSamePath = (p1, p2, n) => {
    const a1 = splitCompactTake(p1, n)
    const a2 = splitCompactTake(p2, n)
    return a1.toString() === a2.toString()
}

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
            slug: section.id
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
            label: getWording(`nav.${subSectionId}`, {}, getToolName(subSectionId)),
            index: subSectionIndex
        }
    }
    // note: if section specifies its own path use that
    page.path = section.path || getPageUrl(page)
    page.url = getPageUrl(page, true)
    page.title = getPageTitle(page)
    page.fullTitle = getPageTitle(page, true)
    page.intro = getWording(`intros.${page.section.id}`)
    return page
}

/*

Get current page object based on path
(comparing first two segments first, and then falling back to comparing only first segment)

*/
export const getCurrentPage = path => {
    return (
        getAllPages().find(p => isSamePath(p.path, path, 2)) ||
        getAllPages().find(p => isSamePath(p.path, path, 1))
    )
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

        return {}
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
