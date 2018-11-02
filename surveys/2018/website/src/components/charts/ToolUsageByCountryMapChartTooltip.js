import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ToolUsageByCountryMapChartTooltip = ({ feature: { properties, data } }) => {
    let delta = ''
    if (data.delta_from_average > 0) {
        delta = ` (+${data.delta_from_average}%)`
    } else if (data.delta_from_average < 0) {
        delta = ` (${data.delta_from_average})%`
    }

    return (
        <Fragment>
            <strong>{properties.name}</strong>
            <br />
            {data.percentage}%{delta}
            <br />
            {data.count}/{data.total} users
        </Fragment>
    )
}

ToolUsageByCountryMapChartTooltip.propTypes = {
    feature: PropTypes.shape({
        properties: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired,
        data: PropTypes.shape({
            total: PropTypes.number.isRequired,
            count: PropTypes.number.isRequired,
            percentage: PropTypes.number.isRequired,
            delta_from_average: PropTypes.number.isRequired
        }).isRequired
    }).isRequired
}

export default ToolUsageByCountryMapChartTooltip
