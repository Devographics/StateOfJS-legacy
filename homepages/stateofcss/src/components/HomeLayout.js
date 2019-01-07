import React from 'react'

const HomeLayout = props => (
    <div>
        <div className="home-layout-wrapper">
            <h1 className="logo">
                <img src="images/stateofcss-logo.svg" alt="The State Of CSS" />
            </h1>
            <div className="home-layout">{props.children}</div>
        </div>
    </div>
)

export default HomeLayout