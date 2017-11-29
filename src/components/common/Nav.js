import React from 'react'
import Link from 'gatsby-link'
import classNames from 'classnames'
import nav from '../../data/nav.yaml'
import sections from '../../data/sections.yaml'
import slugify from '../../helpers/slugify'
import filter from 'lodash/filter'

const navFiltered = filter(nav, item => !item.hide)

const isActive = (pathname, label) => pathname.indexOf(slugify(label)) !== -1

const Nav = ({ location, closeSidebar }) => (
    <div className="nav">
        <ul>
            {navFiltered.map((item, i) => (
                <NavItem key={i} {...item} location={location} location={location} closeSidebar={closeSidebar}/>
            ))}
        </ul>
    </div>
)

const NavItem = ({ label, subPages, location, comingsoon, closeSidebar }) => (
    <li>
        <h3 className={classNames('nav-page', {'nav-page-comingsoon': comingsoon})}>
            <Link onClick={closeSidebar} to={`/2017/${slugify(label)}/`} activeClassName="nav-page-active">
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

export default Nav
