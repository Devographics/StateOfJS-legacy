import React from 'react'
import Illustration from './Illustration'

const HomeLayout = props => (
    <div>
        <div className="Layout--Home Home">
            <div className="Home__LogoWrapper">
                <h1 className="Home__Logo">
                    <Illustration/>
                </h1>
                {/* <a className="home-take-survey" href="#">Take the Survey</a> */}
            </div>
            <div className="Home__Content">{props.children}</div>
        </div>
    </div>
)

export default HomeLayout
