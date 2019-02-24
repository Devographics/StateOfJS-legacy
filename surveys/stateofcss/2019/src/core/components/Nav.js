import React, { useContext } from 'react'
import sitemap from '../../../config/sitemap.yml'
import { PageContext } from '../pages/pageContext'
import PageLink from '../pages/PageLink'
import PageLabel from '../pages/PageLabel'
import LanguageSwitcher from '../i18n/LanguageSwitcher'

const filteredNav = sitemap.filter(page => !page.is_hidden)

const NavItem = ({ page, currentPath, closeSidebar }) => {
    const isActive = currentPath.indexOf(page.id) !== -1

    return (
        <li>
            <h3 className="nav-page">
                <PageLink onClick={closeSidebar} page={page}>
                    <PageLabel page={page} />
                </PageLink>
            </h3>
            {page.children.length > 0 && (
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

const Nav = ({ closeSidebar }) => {
    const context = useContext(PageContext)

    return (
        <div className="nav">
            <ul>
                <li>
                    <LanguageSwitcher />
                </li>
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
    )
}

export default Nav
