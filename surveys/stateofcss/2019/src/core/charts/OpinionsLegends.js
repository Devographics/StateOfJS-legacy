import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { toolOpinionKeys } from '../../constants'
import theme from '../../nivoTheme'
import { I18nContext } from '../i18n/i18nContext'
import Legends from './Legends'

const OpinionsLegends = ({ useShortLabels, ...rest }) => {
    const { translate } = useContext(I18nContext)

    const legends = toolOpinionKeys
        .map(id => ({
            id,
            label: translate(`opinions.legends${useShortLabels ? '_short' : ''}.${id}`),
            color: theme.opinionColors[id]
        }))
        .reverse()

    return (
        <Legends
            legends={legends}
            itemStyle={{
                padding: '3px 5px'
            }}
            chipStyle={{
                borderRadius: '1px'
            }}
            {...rest}
        />
    )
}

OpinionsLegends.propTypes = {
    useShortLabels: PropTypes.bool.isRequired
}

OpinionsLegends.defaultProps = {
    useShortLabels: true
}

export default OpinionsLegends
