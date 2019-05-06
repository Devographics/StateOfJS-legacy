import React, { useContext } from 'react'
import Legends from 'core/charts/Legends'
import { I18nContext } from 'core/i18n/i18nContext'
import { usage } from '../../../constants'

const FeatureUsageLegends = props => {
    const { translate } = useContext(I18nContext)

    const legends = usage.map(item => ({
        id: item.id,
        label: translate(`features.usage.${item.id}`),
        color: item.color
    }))

    return <Legends legends={legends} {...props} />
}

export default FeatureUsageLegends
