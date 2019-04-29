import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveWaffle } from '@nivo/waffle'
import theme from 'nivoTheme'
import { I18nContext } from 'core/i18n/i18nContext'
import { ResponsiveBar } from '@nivo/bar'
import { featureColors } from '../../../constants'

const Cell = props => {
    return (
        <circle
            cx={props.x + props.size / 2}
            cy={props.y + props.size / 2}
            r={props.size / 2}
            fill={props.color}
            onClick={props.onClick}
            onMouseEnter={props.onHover}
            onMouseMove={props.onHover}
            onMouseLeave={props.onLeave}
        />
    )
}

const defaultKeys = ['used_it', 'know_not_used', 'never_heard_not_sure']

const FeatureUsageBarChart = ({ feature, keys = defaultKeys }) => {
    const { translate } = useContext(I18nContext)

    // const data = keys.map(key => ({
    //     id: key,
    //     label: translate(`features.usage.${key}`),
    //     value: feature.usage[key] || 0
    // }))

    const data = feature.usage

    return (
        <ResponsiveBar
            layout="horizontal"
            theme={theme}
            // columns={8}
            // rows={12}
            // padding={5}
            // total={feature.total}
            // margin={{
            //     bottom: 5
            // }}
            // cellComponent={Cell}
            colors={featureColors}
            // emptyColor="#ffffff"
            data={[data]}
            indexBy="country"
            keys={keys}
        />
    )
}

FeatureUsageBarChart.propTypes = {
    feature: PropTypes.shape({
        id: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
        usage: PropTypes.shape({
            used_it: PropTypes.number.isRequired,
            know_not_used: PropTypes.number.isRequired,
            never_heard_not_sure: PropTypes.number.isRequired
        }).isRequired
    }).isRequired
}

export default FeatureUsageBarChart
