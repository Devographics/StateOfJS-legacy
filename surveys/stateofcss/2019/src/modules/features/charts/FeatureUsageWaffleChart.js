import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveWaffle } from '@nivo/waffle'

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

const FeatureUsageWaffleChart = ({ feature, keys }) => {
    const data = [
        {
            id: 'used_it',
            label: 'used_it',
            value: feature.usage.used_it
        },
        {
            id: 'know_not_used',
            label: 'know_not_used',
            value: feature.usage.know_not_used
        },
        {
            id: 'never_heard_not_sure',
            label: 'never_heard_not_sure',
            value: feature.usage.never_heard_not_sure
        }
    ].map(d => ({
        ...d,
        value: keys.includes(d.id) ? d.value : 0
    }))

    return (
        <ResponsiveWaffle
            columns={8}
            rows={12}
            padding={5}
            total={feature.total}
            margin={{
                bottom: 5
            }}
            cellComponent={Cell}
            colors={['#3c52d1', '#5dd6da', '#cccccc']}
            emptyColor="#ffffff"
            data={data}
        />
    )
}

FeatureUsageWaffleChart.propTypes = {
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

export default FeatureUsageWaffleChart
