import React from 'react'
import PropTypes from 'prop-types'
import RadarChart from '../charts/RadarChart'

const RadarBlock = () => (
    <div className="block block--chart block--happiness">
        <h3 className="block__title">Radar Chart</h3>
        <div className="block__description">
            <p>radar chart description</p>
        </div>
        <div>
            <RadarChart />
        </div>
    </div>
)

RadarBlock.propTypes = {
    score: PropTypes.number.isRequired
}

export default RadarBlock
