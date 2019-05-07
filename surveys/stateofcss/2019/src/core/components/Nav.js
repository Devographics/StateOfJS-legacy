import React, { useContext } from 'react'
import sitemap from '../../../config/sitemap.yml'
import { PageContext } from '../helpers/pageContext'
import PageLink from '../pages/PageLink'
import PageLabel from '../pages/PageLabel'
import LanguageSwitcher from '../i18n/LanguageSwitcher'

const filteredNav = sitemap.filter(page => !page.is_hidden)

const NavItem = ({ page, currentPath, closeSidebar, level = 0 }) => {
    const isActive = currentPath.indexOf(page.id) !== -1
    const shouldDisplayChildren = page.children.length > 0 && (level < 1 || isActive)

    return (
        <>
            <div className={`Nav__Page Nav__Page--lvl-${level}`}>
                <PageLink
                    className={`Nav__Page__Link ${isActive ? ' Nav__Page__Link--active' : ''}`}
                    activeClassName="Nav__Page__Link--active"
                    onClick={closeSidebar}
                    page={page}
                >
                    <PageLabel page={page} />
                </PageLink>
                {shouldDisplayChildren && (
                    <div className={`Nav__SubPages Nav__SubPages--lvl-${level}`}>
                        {page.children.map(childPage => (
                            <NavItem
                                key={childPage.id}
                                page={childPage}
                                closeSidebar={closeSidebar}
                                currentPath={currentPath}
                                level={level + 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

const Nav = ({ closeSidebar }) => {
    const context = useContext(PageContext)

    return (
        <div className="Nav">
            <LanguageSwitcher />
            {filteredNav.map((page, i) => (
                <NavItem
                    key={i}
                    page={page}
                    currentPath={context.currentPath}
                    closeSidebar={closeSidebar}
                />
            ))}
        </div>
    )
}

export default Nav
