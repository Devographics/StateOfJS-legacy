import React from 'react'
import Link from 'gatsby-link'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import nav from '../../data/nav.yaml'
import sections from '../../data/sections.yaml'
import slugify from '../../helpers/slugify'
import filter from 'lodash/filter'

const navFiltered = filter(nav, item => !item.hide)

const isActive = (pathname, label) => pathname.indexOf(slugify(label)) !== -1

const NavItem = ({ label, subPages, location, comingSoon, closeSidebar }) => (
    <li>
        <h3 className={classNames('nav-page', { 'nav-page-comingsoon': comingSoon })}>
            <Link
                onClick={closeSidebar}
                to={`/2017/${slugify(label)}/`}
                activeClassName="nav-page-active"
            >
                {label}
            </Link>
        </h3>
        <div className="nav-subpages">
            {isActive(location.pathname, label) &&
                subPages &&
                subPages.map((subPage, i) => (
                    <NavSubItem
                        key={i}
                        parentLabel={label}
                        label={sections[subPage].label}
                        fullLabel={sections[subPage].fullLabel}
                        closeSidebar={closeSidebar}
                    />
                ))}
        </div>
    </li>
)

NavItem.propTypes = {
    label: PropTypes.string.isRequired,
    subPages: PropTypes.array,
    location: PropTypes.object.isRequired,
    comingSoon: PropTypes.bool,
    closeSidebar: PropTypes.func.isRequired
}

const NavSubItem = ({ parentLabel, label, fullLabel, closeSidebar }) => (
    <Link
        className="nav-subpage"
        activeClassName="nav-subpage-active"
        to={`/2017/${slugify(parentLabel)}/${slugify(label)}/`}
        onClick={closeSidebar}
    >
        {fullLabel}{' '}
    </Link>
)

NavSubItem.propTypes = {
    parentLabel: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    fullLabel: PropTypes.string.isRequired,
    closeSidebar: PropTypes.func.isRequired
}

const Nav = ({ location, closeSidebar }) => (
    <div className="nav">
        <ul>
            {navFiltered.map((item, i) => (
                <NavItem key={i} {...item} location={location} closeSidebar={closeSidebar} />
            ))}
        </ul>
    </div>
)

Nav.propTypes = {
    location: PropTypes.object.isRequired,
    closeSidebar: PropTypes.func.isRequired
}

export default Nav
