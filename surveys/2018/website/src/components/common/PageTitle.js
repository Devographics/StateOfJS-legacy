import React from 'react'
import getPageUrl from '../../helpers/getPageUrl'
import Link from 'gatsby-link'
import classNames from 'classnames'
// import { navigateTo } from 'gatsby-link'
// import getPages from '../../helpers/getPages'
import getTitle from '../../helpers/getTitle'
import withPageData from '../../helpers/withPageData'

class PageTitle extends React.PureComponent {
    // handleKeyDown = e => {
    //     const { previousPage, nextPage } = getPages(this.props.path)
    //     if (this.props.mode === 'title') {
    //         if (e.keyCode === 37) {
    //             navigateTo(
    //                 getPageUrl(
    //                     previousPage.section.label,
    //                     previousPage.subSection && previousPage.subSection.label
    //                 )
    //             )
    //         } else if (e.keyCode === 39) {
    //             navigateTo(
    //                 getPageUrl(
    //                     nextPage.section.label,
    //                     nextPage.subSection && nextPage.subSection.label
    //                 )
    //             )
    //         }
    //     }
    // }

    render() {
        const { currentPage, previousPage, nextPage, mode, title } = this.props
        const tabindex = {}

        return (
            <div
                {...tabindex}
                ref="title" // eslint-disable-line react/no-string-refs
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
                                to={getPageUrl(previousPage)}
                            >
                                <span className="pagination__link__symbol">&lt;&lt;&nbsp;</span>
                                <span className="pagination__link__label">
                                    {getTitle(previousPage, true)}
                                </span>
                            </Link>
                        ) : (
                            <span />
                        )}
                        {mode === 'title' && (
                            <h2 className="pagetitle__main">{title || getTitle(currentPage)}</h2>
                        )}
                        {nextPage ? (
                            <Link
                                className="pagination__link pagination__next"
                                to={getPageUrl(nextPage)}
                            >
                                <span className="pagination__link__label">
                                    {getTitle(nextPage, true)}
                                </span>
                                <span className="pagination__link__symbol">&nbsp;&gt;&gt;</span>
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
    mode: 'title'
}

export default withPageData(PageTitle)
