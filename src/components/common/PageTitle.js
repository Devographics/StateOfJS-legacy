import React from 'react'
import _ from 'lodash'
import getPageUrl from '../../helpers/getPageUrl'
import Link from 'gatsby-link'
import classNames from 'classnames'
import { navigateTo } from 'gatsby-link'
import getPages from '../../helpers/getPages'

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
export default class PageTitle extends React.PureComponent {
    handleKeyDown = e => {
        const { previousPage, nextPage } = getPages(this.props.location.pathname)
        if (this.props.mode === 'title') {
            if (e.keyCode == 37) {
                navigateTo(
                    getPageUrl(
                        previousPage.section.label,
                        previousPage.subSection && previousPage.subSection.label
                    )
                )
            } else if (e.keyCode == 39) {
                navigateTo(
                    getPageUrl(
                        nextPage.section.label,
                        nextPage.subSection && nextPage.subSection.label
                    )
                )
            }
        }
    }

    getPages = () => {
        const currentPage = getCurrentPage()
        return {
            currentPage,
            previousPage: getPreviousPage(currentPage),
            nextPage: getNextPage(currentPage),
        }
    }

    render() {
        const { location, mode } = this.props

        const { currentPage, previousPage, nextPage } = getPages(this.props.location.pathname)

        const tabindex = mode === 'title' ? { tabIndex: 0 } : {}

        return (
            <div
                {...tabindex}
                ref="title"
                onKeyDown={this.handleKeyDown}
                className={classNames(
                    `pagetitle__wrapper`,
                    mode === 'pagination'
                        ? 'pagetitle__wrapper--pagination'
                        : 'pagetitle__wrapper--title'
                )}
            >
                <div className="pagetitle">
                    <div className="pagetitle__inner">
                        {previousPage ? (
                            <Link
                                className="pagination__link pagination__previous"
                                to={getPageUrl(
                                    previousPage.section.label,
                                    previousPage.subSection && previousPage.subSection.label
                                )}
                            >
                                <span className="pagination__link__symbol">&lt;&lt;</span>
                                <span className="pagination__link__label">
                                    {getTitle(previousPage, true)}
                                </span>
                            </Link>
                        ) : (
                            <span />
                        )}
                        {mode === 'title' && (
                            <h2 className="pagetitle__main">{getTitle(currentPage)}</h2>
                        )}
                        {nextPage ? (
                            <Link
                                className="pagination__link pagination__next"
                                to={getPageUrl(
                                    nextPage.section.label,
                                    nextPage.subSection && nextPage.subSection.label
                                )}
                            >
                                <span className="pagination__link__label">
                                    {getTitle(nextPage, true)}
                                </span>
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
}

PageTitle.defaultProps = {
    mode: 'title',
}
