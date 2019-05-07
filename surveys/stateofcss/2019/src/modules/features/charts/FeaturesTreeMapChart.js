import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveTreeMapHtml } from '@nivo/treemap'
import { usage } from '../../../constants'

const used = usage.find(u => u.id === 'used_it')

const Node = memo(({ style, node }) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: style.width,
                height: style.height,
                backgroundColor: style.color,
                transform: `translate3d(${style.x}px,${style.y}px,0)`,
                display: 'flex',
                color: 'white',
                fontSize: '14px',
                lineHeight: '19px',
                padding: '10px 14px',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                whiteSpace: 'pre',
                overflow: 'hidden'
            }}
        >
            <span>{node.id}</span>
            <strong>{node.value}</strong>
        </div>
    )
})

// This chart is a POC, styles should be moved to stylesheets,
// labels translated… if we wish to use it.
const FeaturesTreeMapChart = ({ features }) => {
    const data = features.map(feature => {
        return {
            id: feature.id,
            value: feature.buckets.find(bucket => bucket.id === used.raw).count
        }
    })

    return (
        <div style={{ height: 320, marginTop: 30 }}>
            <ResponsiveTreeMapHtml
                root={{
                    id: 'root',
                    children: data
                }}
                innerPadding={2}
                leavesOnly={true}
                orientLabel={false}
                isInteractive={false}
                colors={['rgb(60, 82, 209)']}
                nodeComponent={props => <Node {...props} />}
            />
        </div>
    )
}

FeaturesTreeMapChart.propTypes = {
    features: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            total: PropTypes.number.isRequired,
            buckets: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    count: PropTypes.number.isRequired,
                    percentage: PropTypes.number.isRequired
                })
            ).isRequired
        })
    )
}

export default memo(FeaturesTreeMapChart)
