import React, { useContext } from 'react'
import Hamburger from '../components/Hamburger'
import { PageContext } from '../helpers/pageContext'
import PageLabel from '../pages/PageLabel'
import PageLink from '../pages/PageLink'
import LanguageSwitcher from '../i18n/LanguageSwitcher'

const Pagination = ({ position, toggleSidebar }) => {
    const context = useContext(PageContext)

    let previous = <span />
    if (context.previous !== undefined) {
        previous = (
            <PageLink page={context.previous} className="pagination__link pagination__previous">
                <span className="pagination__link__symbol">&lt;&lt;&nbsp;</span>
                <span className="pagination__link__label pagination__link__label--full">
                    <PageLabel page={context.previous} mode="long" />
                </span>
                <span className="pagination__link__label pagination__link__label--short">
                    <PageLabel page={context.previous} />
                </span>
            </PageLink>
        )
    }

    let next = <span />
    if (context.next !== undefined) {
        next = (
            <PageLink page={context.next} className="pagination__link pagination__next">
                <span className="pagination__link__label pagination__link__label--full">
                    <PageLabel page={context.next} mode="long" />
                </span>
                <span className="pagination__link__label pagination__link__label--short">
                    <PageLabel page={context.next} />
                </span>
                <span className="pagination__link__symbol">&nbsp;&gt;&gt;</span>
            </PageLink>
        )
    }

    return (
        <div
            className={`pagetitle__wrapper pagetitle__wrapper--pagination pagetitle__wrapper--${position}`}
        >
            <div className="pagetitle">
                <div className="pagetitle__inner">
                    {previous}
                    <div className="pagination__middle">
                        {position === 'top' && (
                            <>
                                <span className="PageTitle__Sidebar__Toggle">
                                    <button className="Sidebar__Toggle" onClick={toggleSidebar}>
                                        <span>
                                            <Hamburger />
                                        </span>
                                    </button>
                                </span>
                                <LanguageSwitcher />
                            </>
                        )}
                    </div>
                    {next}
                </div>
            </div>
        </div>
    )
}

Pagination.defaultProps = {
    mode: 'title'
}

export default Pagination
