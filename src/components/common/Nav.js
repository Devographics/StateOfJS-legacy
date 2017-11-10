import React from 'react'
import Link from 'gatsby-link'
import classNames from 'classnames'
import nav from '../../data/nav.json'
import sections from '../../data/sections.json'
import slugify from '../../helpers/slugify'

const isActive = (pathname, label) => pathname.indexOf(slugify(label)) !== -1

const Nav = ({ location }) =>
    <div className="nav">
		<ul>
			{nav.items.map((item, i) => <NavItem key={i} {...item} location={location} location={location} />)}
		</ul>
    </div>

const NavItem = ({ label, subPages, location }) =>
  <li>
    <h3 className="nav-page"><Link to={`/2017/${slugify(label)}/`}>{label}</Link></h3>
    <div className="nav-subpages">
      {isActive(location.pathname, label) && subPages && subPages.map((subPage, i) => <NavSubItem key={i} parentLabel={label} label={sections[subPage].label} location={location} />)}
    </div>
  </li>

const NavSubItem = ({ parentLabel, label, location }) =>
  <Link className={classNames('nav-subpage', {'nav-subpage-active': isActive(location.pathname, label)})} to={`/2017/${slugify(parentLabel)}/${slugify(label)}/`}>{label} </Link>

export default Nav
