import React from 'react'
import Heatmap from '../heatmap/Heatmap.js'

const HeatmapBlock = props => {
  return (
    <div className="section section-layout-b">
      <Heatmap {...props} width={600} height={600} />
      <div className="section-contents-wide">
        <props.contents />
      </div>
    </div>
  )
}

HeatmapBlock.propTypes = {
  title: React.PropTypes.string,
  contents: React.PropTypes.func,
  data: React.PropTypes.array,
  items: React.PropTypes.array,
}

export default HeatmapBlock
