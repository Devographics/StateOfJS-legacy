import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ToolUsageByCountryMapChartTooltip = ({ feature: { properties, data } }) => {
    return (
        <Fragment>
            <strong>{properties.name}</strong>
            <br />
            {data.count} users
            <br />
            {data.percentage}% of respondents
            <br />
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
