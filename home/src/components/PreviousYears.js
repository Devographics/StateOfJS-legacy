import React from 'react'
import T from '../helpers/translator'

const PreviousYears = () => (
    <div className="section section-layout-b previous-years">
        <div className="or">{T.translate('components.previousyears.text')}</div>
        <div className="previous-years-links">
            <a className="previous-years-link button" href="http://2016.stateofjs.com">
                2016
            </a>
            <a className="previous-years-link button" href="http://2017.stateofjs.com">
                2017
            </a>
        </div>
    </div>
)

export default PreviousYears
