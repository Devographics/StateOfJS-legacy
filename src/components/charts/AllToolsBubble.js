import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBubbleHtml } from 'nivo'

const AllToolsBubble = ({ data, colorScale }) => (
    <div className="chart-wrapper" style={{ height: 800 }}>
        <ResponsiveBubbleHtml
            identity="key"
            tile="squarify"
            value="doc_count"
            leavesOnly={true}
            innerPadding={2}
            labelColor="inherit:darker(5)"
            labelSkipRadius={24}
            colorBy={d => colorScale(d.percentage)}
            root={{
                key: 'root',
                children: data
            }}
        />
    </div>
)

AllToolsBubble.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            doc_count: PropTypes.number.isRequired,
            percentage: PropTypes.number.isRequired,
        })
    ).isRequired,
    colorScale: PropTypes.func.isRequired
}

export default AllToolsBubble
