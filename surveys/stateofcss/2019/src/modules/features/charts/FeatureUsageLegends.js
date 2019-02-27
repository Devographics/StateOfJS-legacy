import React, { useContext } from 'react'
import Legends from 'core/charts/Legends'
import { I18nContext } from 'core/i18n/i18nContext'

const colors = ['#3c52d1', '#5dd6da', '#cccccc']

const FeatureUsageLegends = (props) => {
    const { translate } = useContext(I18nContext)

    const legends = ([
        'used_it',
        'know_not_used',
        'never_heard_not_sure',
    ]).map((key, i) => ({
        id: key,
        label: translate(`features.usage.${key}`),
        color: colors[i]
    }))

    return (
        <Legends
            legends={legends}
            {...props}
        />
    )
}

export default FeatureUsageLegends
