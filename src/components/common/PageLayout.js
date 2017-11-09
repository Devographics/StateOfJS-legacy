import React from 'react'

import Nav from './Nav'

const PageLayout = ({ children }) =>
    <div className="page-layout">
    	<Nav/>
    	{children}
    </div>

export default PageLayout
