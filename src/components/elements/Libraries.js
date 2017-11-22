import React from 'react'
import PropTypes from 'prop-types'
import libraries from '../../data/libraries.json'
import find from 'lodash/find'
import { aliases } from '../../constants.js'
import classNames from 'classnames'

const Libraries = ({ data, variant = "horizontal" }) => (
    <div className={`libraries libraries-${variant}`}>
        {data.map(result => {
        	const key = result.tool || result.key
			const libraryName = aliases[key] ? aliases[key] : key
			const library = find(libraries.projects, { name: libraryName })

			if (library) {
				return (
		        	<div key={libraryName} className="libraries-item">
		        		<span className="libraries-item-link enabled">{libraryName}</span>
		        		<Tooltip library={library} variant={variant}/>
		        	</div>
	        	)
			} else {
				return (
		        	<div key={libraryName} className="libraries-item">
		        		<span className="libraries-item-link">{libraryName}</span>
		        	</div>
	        	)

			}
        	
    	})}
    </div>
)

const Tooltip = ({ library, variant }) => 
	<div className={classNames('library-tooltip', {'arrow-top': variant === 'horizontal'}, {'arrow-right': variant === 'vertical'})}>
		<div className="toolip-top-zone"/>
		<div className="tooltip-inner">
			<h3><a href={library.homepage}>{library.name}</a></h3>
			<p>{library.description}</p>
			<h4>Learn More</h4>
			<ul>
				<li><a href={library.homepage}>Homepage</a></li>
				<li><a href={`https://github.com/${library.github}`}>GitHub</a></li>
				<li><a href={`https://bestof.js.org/projects/${library.slug}`}>BestOfJS</a></li>
			</ul>
		</div>
	</div>

Libraries.propTypes = {
    data: PropTypes.array.isRequired,
    variant: PropTypes.string
}

export default Libraries
