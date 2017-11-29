import React from 'react'
import Link from 'gatsby-link'
import Nav from './Nav'
import PageTitle from './PageTitle'
import Logo from './Logo'

const Spacer = () => <div className="pagelayout__spacer"/>

const PageLayout = props => (
    <div className="pagelayout">
    	<div className="pagelayout__header">
    		<Spacer/>
    		<h1 className="pagelayout__logo"><Link to="/"><Logo width={150}/></Link></h1>
    		<Spacer/>
    	</div>
    	<div className="pagelayout__inner">
	        <div className="sidebar">
	            <Nav {...props} />
	        </div>
	        <div className="content">
                <PageTitle {...props} />
	            {props.children}
                <PageTitle {...props} mode="pagination" />
	        </div>
        </div>
    </div>
)

export default PageLayout
