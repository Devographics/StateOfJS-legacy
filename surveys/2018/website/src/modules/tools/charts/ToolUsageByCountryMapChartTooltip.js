import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Trans from 'core/i18n/Trans'
import { countryNameToTranslationKey } from "core/i18n/translation-key-getters";

const ToolUsageByCountryMapChartTooltip = ({
    feature: {
        properties,
        data: { count, percentage }
    }
}) => (
    <Trans>
        {translate => (
            <Fragment>
                <strong>{translate(countryNameToTranslationKey(properties.name))}</strong>
                <br />
                {translate('users_count', { values: { count } })}
                <br />
                {translate('percentage_of_respondents', {
                    values: { percentage: `${percentage}%` }
                })}
                <br />
            </Fragment>
        )}
    </Trans>
)

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
