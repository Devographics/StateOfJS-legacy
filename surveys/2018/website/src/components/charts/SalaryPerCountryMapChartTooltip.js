import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const SalaryPerCountryMapChartTooltip = ({ feature: { properties, data } }) => {
    return (
        <Fragment>
            <strong>{properties.name}</strong>
            <br />
            average: <strong>${data.salary.average.toFixed(3).replace('.', ',')}</strong>
        </Fragment>
    )
}

SalaryPerCountryMapChartTooltip.propTypes = {
    feature: PropTypes.shape({
        properties: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired,
        data: PropTypes.shape({
            salary: PropTypes.shape({
                average: PropTypes.number.isRequired
            }).isRequired
        }).isRequired
    }).isRequired
}

export default SalaryPerCountryMapChartTooltip
