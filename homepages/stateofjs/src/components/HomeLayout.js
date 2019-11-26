import React from 'react'

import PeriodicTable from './PeriodicTable'

const HomeLayout = props => (
    <div>
        <PeriodicTable {...props} />
        <div className="home-layout-wrapper">
            <h1 className="logo">
                <img src="images/stateofjs2019-logo.svg" alt="The State Of JavaScript" />
                {/* <div className="logo-1"/>
            <div className="logo-2"/>*/}
            </h1>
            <div className="home-layout">{props.children}</div>
        </div>
    </div>
)

export default HomeLayout