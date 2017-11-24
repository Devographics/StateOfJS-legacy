import React from 'react'
import WorldwideBlock from '../blocks/WorldwideBlock'
import Meta from '../elements/Meta'

const WorldwideTemplate = (props) =>
	<div className="template">
		<Meta section={props.section} subSection="worldwide" />
	    <WorldwideBlock {...props}/>
    </div>

export default WorldwideTemplate