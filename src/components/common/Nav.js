import React from 'react'
import Link from "gatsby-link"

import nav from '../../data/nav.json'

const slugify = s => s.toLowerCase().replace(' ', '-')

const Nav = () =>
    <div className="nav">
		<ul>
			{nav.items.map(label => <li><Link to={`/2017/${slugify(label)}/experience`}>{label}</Link></li>)}
		</ul>
    </div>

export default Nav
