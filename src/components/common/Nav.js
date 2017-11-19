import React from 'react'
import Link from 'gatsby-link'
import classNames from 'classnames'
import nav from '../../data/nav.yaml'
import sections from '../../data/sections.yaml'
import slugify from '../../helpers/slugify'

const isActive = (pathname, label) => pathname.indexOf(slugify(label)) !== -1

const Nav = ({ location }) => (
    <div className="nav">
        <ul>
            {nav.items.map((item, i) => (
                <NavItem key={i} {...item} location={location} location={location} />
            ))}
        </ul>
    </div>
)

const NavItem = ({ label, subPages, location }) => (
    <li>
        <h3 className="nav-page">
            <Link to={`/2017/${slugify(label)}/`} activeClassName="nav-page-active">
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
                    />
                ))}
        </div>
    </li>
)

const NavSubItem = ({ parentLabel, label, fullLabel }) => (
    <Link
        className="nav-subpage"
        activeClassName="nav-subpage-active"
        to={`/2017/${slugify(parentLabel)}/${slugify(label)}/`}
    >
        {fullLabel}{' '}
    </Link>
)

export default Nav
