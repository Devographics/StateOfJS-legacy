import filter from 'lodash/filter'
import findIndex from 'lodash/findIndex'
import slugify from './slugify'
import nav from '../data/nav.yaml'
import sections from '../data/sections.yaml'

const navFiltered = filter(nav, item => !item.hide)

export const getCurrentPage = pathname => {
    const sectionIndex = findIndex(nav, item => pathname.indexOf(slugify(item.label)) !== -1)
    const page = {
        sectionIndex,
        section: nav[sectionIndex]
    }
    if (page.section.subPages) {
        const subSectionIndex = findIndex(
            nav[sectionIndex].subPages,
            item => pathname.indexOf(slugify(item)) !== -1
        )
        page.subSectionIndex = subSectionIndex
        page.subSection = sections[nav[sectionIndex].subPages[subSectionIndex]]
    }
    return page
}

export const getPreviousPage = ({ section, sectionIndex, subSectionIndex }) => {
    let previousPage = {}

    if (section.subPages && subSectionIndex > 0) {
        // 1. previous page is in the same section
        const previousSubSection = section.subPages[subSectionIndex - 1]
        previousPage = {
            section,
            sectionIndex,
            subSection: sections[previousSubSection],
            subSectionIndex: subSectionIndex - 1
        }
    } else {
        // 2a. first page of the results
        if (sectionIndex === 0) {
            return null
        }
        // 2b. previous page is in another section
        const previousSection = navFiltered[sectionIndex - 1]
        previousPage = {
            section: previousSection,
            sectionIndex: sectionIndex - 1
        }
        // previous section has subPages
        if (previousSection.subPages) {
            const previousSubSectionIndex = previousSection.subPages.length - 1

            previousPage = {
                ...previousPage,
                subSection: sections[previousSection.subPages[previousSubSectionIndex]],
                subSectionIndex: previousSubSectionIndex
            }
        }
    }

    return previousPage
}

export const getNextPage = ({ section, sectionIndex, subSectionIndex }) => {
    if (section.subPages && subSectionIndex < section.subPages.length - 1) {
        // 1. next page is in the same section
        const nextSubSection = section.subPages[subSectionIndex + 1]
        return {
            section,
            sectionIndex,
            subSection: sections[nextSubSection],
            subSectionIndex: subSectionIndex + 1
        }
    } else {
        // 2a. last page of results
        if (sectionIndex === navFiltered.length - 1) {
            return null
        }
        // 2b. next page is in another section
        const nextSection = navFiltered[sectionIndex + 1]
        return {
            section: nextSection,
            sectionIndex: sectionIndex + 1
        }
    }
}

export const getPages = pathname => {
    const currentPage = getCurrentPage(pathname)
    if (currentPage.section.hide) {
        // page is outside "normal" sidebar nav
        return { currentPage }
    } else {
        return {
            currentPage,
            previousPage: getPreviousPage(currentPage),
            nextPage: getNextPage(currentPage)
        }
    }
}

export default getPages
