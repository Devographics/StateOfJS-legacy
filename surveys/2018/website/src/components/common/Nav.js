import React from 'react'
import Link from 'gatsby-link'
import classNames from 'classnames'
import nav from '../../data/nav.yaml'
import filter from 'lodash/filter'
import { createPage } from '../../helpers/getPages'
import withPageData from '../../helpers/withPageData'

const navFiltered = filter(nav, item => !item.hide)

const isActive = (currentPath, slug) => currentPath.indexOf(slug) !== -1

const NavItem = ({ currentPath, subPages, comingSoon, closeSidebar, index }) => {
    const page = createPage(index)
    return (
        <li>
            <h3 className={classNames('nav-page', { 'nav-page-comingsoon': comingSoon })}>
                <Link onClick={closeSidebar} to={page.path} activeClassName="nav-page-active">
                    {page.section.label}
                </Link>
            </h3>
            <div className="nav-subpages">
                {isActive(currentPath, page.section.slug) &&
                    subPages &&
                    subPages.map((subPageLabel, j) => {
                        const subPage = createPage(index, j)
                        return <NavSubItem key={j} page={subPage} closeSidebar={closeSidebar} />
                    })}
            </div>
        </li>
    )
}

const NavSubItem = ({ page, closeSidebar }) => {
    return (
        <Link
            className={`nav-subpage nav-subpage--${page.subSection.id}`}
            activeClassName="nav-subpage-active"
            to={page.path}
            onClick={closeSidebar}
        >
            {page.subSection.label}{' '}
        </Link>
    )
}

const Nav = ({ path, closeSidebar }) => {
    return (
        <div className="nav">
            <ul>
                {navFiltered.map((item, i) => (
                    <NavItem
                        key={i}
                        index={i}
                        {...item}
                        currentPath={path}
                        closeSidebar={closeSidebar}
                    />
                ))}
            </ul>
        </div>
    )
}

export default withPageData(Nav)
