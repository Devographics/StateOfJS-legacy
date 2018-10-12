import React from 'react'
import PropTypes from 'prop-types'

const RadarChart = ({ score }) => (
    <div className="radar__wrapper">
        radar chart goes here
    </div>
)

RadarChart.propTypes = {
    score: PropTypes.number.isRequired
}

export default RadarChart
