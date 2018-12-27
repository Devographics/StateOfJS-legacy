import React from 'react'
import nav from '../../../../config/enhanced_nav.yml'
import { PageContextConsumer } from '../pages/pageContext'
import PageLink from '../pages/PageLink'
import PageLabel from '../pages/PageLabel'
import LanguageSwitcher from '../i18n/LanguageSwitcher';

const filteredNav = nav.filter(page => !page.is_hidden)

const NavItem = ({ page, currentPath, closeSidebar }) => {
    const isActive = currentPath.indexOf(page.id) !== -1

    return (
        <li>
            <h3 className="nav-page">
                <PageLink onClick={closeSidebar} page={page}>
                    <PageLabel page={page} />
                </PageLink>
            </h3>
            {page.type === 'section' &&
                isActive && (
                    <div className="nav-subpages">
                        {page.children.map(childPage => (
                            <NavSubItem
                                key={childPage.id}
                                page={childPage}
                                closeSidebar={closeSidebar}
                            />
                        ))}
                    </div>
                )}
        </li>
    )
}

const NavSubItem = ({ page, closeSidebar }) => {
    return (
        <PageLink
            className={`nav-subpage nav-subpage--${page.type}`}
            activeClassName="nav-subpage-active"
            page={page}
            onClick={closeSidebar}
        >
            <PageLabel page={page} />{' '}
        </PageLink>
    )
}

const Nav = ({ closeSidebar }) => (
    <PageContextConsumer>
        {context => (
            <div className="nav">
                <ul>
                    <li><LanguageSwitcher/></li>
                    {filteredNav.map((page, i) => (
                        <NavItem
                            key={i}
                            page={page}
                            currentPath={context.currentPath}
                            closeSidebar={closeSidebar}
                        />
                    ))}
                </ul>
            </div>
        )}
    </PageContextConsumer>
)

export default Nav
