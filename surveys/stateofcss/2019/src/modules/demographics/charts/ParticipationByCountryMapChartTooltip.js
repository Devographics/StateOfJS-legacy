import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { I18nContext } from 'core/i18n/i18nContext'
import { countryNameToTranslationKey } from 'core/i18n/translation-key-getters'

const ParticipationByCountryMapChartTooltip = ({ feature: { properties, data } }) => {
    const { translate } = useContext(I18nContext)

    return (
        <>
            <strong>{translate(countryNameToTranslationKey(properties.name))}</strong>
            <br />
            {data.percentage > 0 ? `${data.percentage}% - ` : ''}
            {translate('users_count', { values: { count: data.count } })}
        </>
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
