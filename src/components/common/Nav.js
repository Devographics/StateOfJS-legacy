import React from 'react'
import Link from "gatsby-link"

import nav from '../../data/nav.json'

const slugify = s => s.toLowerCase().replace(' ', '-')

const NavItem = ({ label, subPages, isActive }) =>
  <li>
    <h3 className="nav-page"><Link to={`/2017/${slugify(label)}/`}>{label}</Link></h3>
    <div className="nav-subpages">
      {isActive && subPages && subPages.map((page, i) => 
        <Link key={i} className="nav-subpage" to={`/2017/${slugify(label)}/${slugify(page)}/`}>{page} </Link>
      )}
    </div>
  </li>

const Nav = ({ location }) =>
    <div className="nav">
		<ul>
			{nav.items.map((item, i) => <NavItem key={i} {...item} isActive={location.pathname.indexOf(slugify(item.label)) !== -1} />)}
		</ul>
    </div>

export default Nav
