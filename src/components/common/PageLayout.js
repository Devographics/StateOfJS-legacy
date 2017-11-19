import React from 'react'

import Nav from './Nav'
import PageTitle from './PageTitle'

const PageLayout = props => (
    <div className="page-layout">
        <div className="sidebar">
            <Nav {...props} />
        </div>
        <div className="content">
            <PageTitle {...props} />
            {props.children}
        </div>
    </div>
)

export default PageLayout
