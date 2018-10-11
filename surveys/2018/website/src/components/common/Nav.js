import React from 'react'
import Link from 'gatsby-link'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import nav from '../../data/nav.yaml'
import slugify from '../../helpers/slugify'
import filter from 'lodash/filter'
import { createPage, getAllPages } from '../../helpers/getPages'

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
                        return (
                            <NavSubItem
                                key={j}
                                parentLabel={subPage.section.label}
                                label={subPage.subSection.label}
                                closeSidebar={closeSidebar}
                            />
                        )
                    })}
            </div>
        </li>
    )
}

NavItem.propTypes = {
    label: PropTypes.string.isRequired,
    subPages: PropTypes.array,
    comingSoon: PropTypes.bool,
    closeSidebar: PropTypes.func.isRequired
}

const NavSubItem = ({ parentLabel, label, closeSidebar }) => (
    <Link
        className="nav-subpage"
        activeClassName="nav-subpage-active"
        to={`/${slugify(parentLabel)}/${slugify(label)}/`}
        onClick={closeSidebar}
    >
        {label}{' '}
    </Link>
)

NavSubItem.propTypes = {
    parentLabel: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    closeSidebar: PropTypes.func.isRequired
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

Nav.propTypes = {
    closeSidebar: PropTypes.func.isRequired
}

export default Nav
