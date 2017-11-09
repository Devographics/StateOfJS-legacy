import React from 'react'

import Nav from './Nav'

const PageLayout = (props) =>
    <div className="page-layout">
    	<div className="sidebar">
    		<Nav {...props}/>
    	</div>
    	<div className="content">
    		{props.children}
    	</div>
    </div>

export default PageLayout
