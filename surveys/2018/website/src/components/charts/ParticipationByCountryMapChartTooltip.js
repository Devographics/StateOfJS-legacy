import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ParticipationByCountryMapChartTooltip = ({ feature: { properties, data } }) => {
    return (
        <Fragment>
            <strong>{properties.name}</strong>
            <br />
            {data.percentage > 0 ? `${data.percentage}% - ` : ''}
            {data.count} user
            {data.count > 1 ? 's' : ''}
        </Fragment>
    )
}

ParticipationByCountryMapChartTooltip.propTypes = {
    feature: PropTypes.shape({
        properties: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired,
        data: PropTypes.shape({
            count: PropTypes.number.isRequired,
            percentage: PropTypes.number.isRequired
        }).isRequired
    }).isRequired
}

export default ParticipationByCountryMapChartTooltip
