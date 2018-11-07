import React from 'react'
import PropTypes from 'prop-types'
import Heatmap from '../heatmap/Heatmap.js'

import SectionTitle from './SectionTitle.js'

const HeatmapBlock = props => {
    return (
        <div className="Heatmap__Block section section-layout-b">
            {props.title ? <SectionTitle title={props.title} /> : null}
            <div className="section-inner">
                <Heatmap {...props} width={600} height={600} />
                <div className="section-contents-wide">
                    <props.contents />
                </div>
            </div>
        </div>
    )
}

HeatmapBlock.propTypes = {
    title: PropTypes.string,
    contents: PropTypes.func,
    data: PropTypes.array,
    items: PropTypes.array
}

export default HeatmapBlock
