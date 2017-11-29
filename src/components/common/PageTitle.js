import React from 'react'
import nav from '../../data/nav.yaml'
import sections from '../../data/sections.yaml'
import _ from 'lodash'
import slugify from '../../helpers/slugify'
import getPageUrl from '../../helpers/getPageUrl'
import Link from 'gatsby-link'
import filter from 'lodash/filter'

const navFiltered = filter(nav, item => !item.hide)

const getCurrentPage = pathname => {
    const sectionIndex = _.findIndex(navFiltered, item => pathname.indexOf(slugify(item.label)) !== -1)
    const page = {
        sectionIndex,
        section: navFiltered[sectionIndex],
    }
    if (page.section.subPages) {
        const subSectionIndex = _.findIndex(navFiltered[sectionIndex].subPages, item => pathname.indexOf(slugify(item)) !== -1)
        page.subSectionIndex = subSectionIndex
        page.subSection = sections[navFiltered[sectionIndex].subPages[subSectionIndex]]
    }
    return page 
}

const getPreviousPage = ({ section, sectionIndex, subSection, subSectionIndex }) => {
    
    let previousPage = {}

    if (section.subPages && subSectionIndex > 0) {
        // 1. previous page is in the same section
        const previousSubSection = section.subPages[subSectionIndex-1]
        previousPage = {
            section,
            sectionIndex,
            subSection: sections[previousSubSection],
            subSectionIndex: subSectionIndex-1,
        }
    } else {
        // 2a. first page of the results
        if (sectionIndex === 0) {
            return null
        }
        // 2b. previous page is in another section
        const previousSection = navFiltered[sectionIndex-1]
        previousPage = {
            section: previousSection,
            sectionIndex: sectionIndex-1,
        }
        // previous section has subPages
        if (previousSection.subPages) {
            const previousSubSectionIndex = previousSection.subPages.length-1

            previousPage = {
                ...previousPage,
                subSection: sections[previousSection.subPages[previousSubSectionIndex]],
                subSectionIndex: previousSubSectionIndex,
            }
        }
    }

    return previousPage

}

const getNextPage = ({ section, sectionIndex, subSection, subSectionIndex }) => {
    if (section.subPages && subSectionIndex < section.subPages.length-1) {
        // 1. next page is in the same section
        const nextSubSection = section.subPages[subSectionIndex+1]
        return {
            section,
            sectionIndex,
            subSection: sections[nextSubSection],
            subSectionIndex: subSectionIndex+1,
        }
    } else {
        // 2a. last page of results
        if (sectionIndex === navFiltered.length-1) {
            return null
        }
        // 2b. next page is in another section
        const nextSection = navFiltered[sectionIndex+1]
        return {
            section: nextSection,
            sectionIndex: sectionIndex+1
        }
    }
}

const getTitle = ({ section, subSection }, short = false) => {
    let title = ''
    title = short ? section.label : section.fullLabel
    if (subSection) {
        title += ` – ${short ? subSection.label : subSection.fullLabel}`
    }
    return title
}

/*
<h2 className="page-title">
            <div className="inner">{getTitle(location.pathname)}</div>
        </h2>
        */
const PageTitle = ({ location }) => {

    const currentPage = getCurrentPage(location.pathname)
    const previousPage = getPreviousPage(currentPage)
    const nextPage = getNextPage(currentPage)

    console.log(previousPage)
    console.log(currentPage)
    console.log(nextPage)

    return (
        <div className="pagetitle__wrapper">
            
            <div className="pagetitle">
                <div className="pagetitle__inner">
                    {previousPage ? (
                        <Link
                            className="pagination__link pagination__previous"
                            to={getPageUrl(previousPage.section.label, previousPage.subSection && previousPage.subSection.label)}
                        >
                            <span className="pagination__link__symbol">&lt;&lt;</span>
                            <span className="pagination__link__label">{getTitle(previousPage, true)}</span>
                        </Link>
                    ) : (
                        <span />
                    )}
                    <h2 className="pagetitle__main">{getTitle(currentPage)}</h2>
                    {nextPage ? (
                        <Link
                            className="pagination__link pagination__next"
                            to={getPageUrl(nextPage.section.label, nextPage.subSection && nextPage.subSection.label)}
                        >
                            <span className="pagination__link__label">{getTitle(nextPage, true)}</span>
                            <span className="pagination__link__symbol">&gt;&gt;</span>
                        </Link>
                    ) : (
                        <span />
                    )}
                </div>
            </div>
        </div>
    )
}

export default PageTitle
