import React from 'react'

const HomeLayout = props => (
    <div>
        <div className="home-layout">
            <div className="home-logo">
                <h1 className="logo">
                    <img src="images/stateofcss-illustration.svg" alt="The State Of CSS" />
                </h1>
                <a className="home-take-survey" href="#">Take the Survey</a>
            </div>
            <div className="home-content">{props.children}</div>
        </div>
    </div>
)

export default HomeLayout
