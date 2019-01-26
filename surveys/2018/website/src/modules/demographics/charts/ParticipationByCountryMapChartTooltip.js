import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Trans from 'core/i18n/Trans'
import { countryNameToTranslationKey } from "core/i18n/translation-key-getters";

const ParticipationByCountryMapChartTooltip = ({ feature: { properties, data } }) => (
    <Trans>
        {translate => (
            <Fragment>
                <strong>{translate(countryNameToTranslationKey(properties.name))}</strong>
                <br />
                {data.percentage > 0 ? `${data.percentage}% - ` : ''}
                {translate('users_count', { values: { count: data.count } })}
            </Fragment>
        )}
    </Trans>
)

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
