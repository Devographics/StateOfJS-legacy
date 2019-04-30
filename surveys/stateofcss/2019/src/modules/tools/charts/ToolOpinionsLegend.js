import React, { useContext } from 'react'
import Legends from 'core/charts/Legends'
import { I18nContext } from 'core/i18n/i18nContext'
import { opinionKeys, opinionColors } from '../../../constants'

const ToolOpinionsLegend = props => {
    const { translate } = useContext(I18nContext)

    const legends = opinionKeys.map((key, i) => ({
        id: key,
        label: translate(`opinions.legends.${key}`),
        color: opinionColors[i]
    }))

    return <Legends legends={legends} {...props} />
}

export default ToolOpinionsLegend
