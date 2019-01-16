import React from 'react'
import Illustration from './Illustration'

const HomeLayout = props => (
    <div>
        <div className="home-layout">
            <div className="home-logo">
                <h1 className="logo">
                    <Illustration/>
                </h1>
                {/* <a className="home-take-survey" href="#">Take the Survey</a> */}
            </div>
            <div className="home-content">{props.children}</div>
        </div>
    </div>
)

export default HomeLayout
