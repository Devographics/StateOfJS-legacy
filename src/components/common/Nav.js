import React from 'react'
import Link from "gatsby-link"

import nav from '../../data/nav.json'

const slugify = s => s.toLowerCase().replace(' ', '-')

const Nav = () =>
    <div className="nav">
		<ul>
			{nav.items.map(item => 
				<li>
					{item.label}: 
					{item.subPages && item.subPages.map(page => 
						<Link to={`/2017/${slugify(item.label)}/${slugify(page)}/`}>{page} </Link>
					)}
				</li>
			)}
		</ul>
    </div>

export default Nav
