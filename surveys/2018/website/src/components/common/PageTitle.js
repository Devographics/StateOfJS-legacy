import React from 'react'
import Link from 'gatsby-link'
import classNames from 'classnames'
// import { navigateTo } from 'gatsby-link'
// import getPages from '../../helpers/getPages'
import withPageData from '../../helpers/withPageData'
import Hamburger from './Hamburger'

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
        const {
            currentPage,
            previousPage,
            nextPage,
            mode,
            title,
            position,
            toggleSidebar
        } = this.props
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
                        : 'pagetitle__wrapper--title',
                    `pagetitle__wrapper--${position}`
                )}
            >
                <div className="pagetitle">
                    <div className="pagetitle__inner">
                        {previousPage ? (
                            <Link
                                className="pagination__link pagination__previous"
                                to={previousPage.path}
                            >
                                <span className="pagination__link__symbol">&lt;&lt;&nbsp;</span>
                                <span className="pagination__link__label pagination__link__label--full">
                                    {previousPage.title}
                                </span>
                                <span className="pagination__link__label pagination__link__label--short">
                                    {previousPage.shortTitle}
                                </span>
                            </Link>
                        ) : (
                            <span />
                        )}
                        {position === 'top' && (
                            <span className="PageTitle__Sidebar__Toggle">
                                <button className="Sidebar__Toggle" onClick={toggleSidebar}>
                                    <span>
                                        <Hamburger />
                                    </span>
                                </button>
                            </span>
                        )}
                        {nextPage ? (
                            <Link className="pagination__link pagination__next" to={nextPage.path}>
                                <span className="pagination__link__label pagination__link__label--full">
                                    {nextPage.title}
                                </span>
                                <span className="pagination__link__label pagination__link__label--short">
                                    {nextPage.shortTitle}
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
