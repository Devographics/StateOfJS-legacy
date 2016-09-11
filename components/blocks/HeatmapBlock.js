import React from 'react'
import { StickyContainer, Sticky } from 'react-sticky'
import Heatmap from '../heatmap/Heatmap.js'

const HeatmapBlock = props => {
  return (
    <div className="section">
      <StickyContainer className="sticky-container">
        <Sticky className="sticky">
          <Heatmap columns={props.columns} title="Heatmap" data={props.data} width={600} height={600} />
        </Sticky>
      </StickyContainer>

      <div className="section-contents">
        <props.contents />
      </div>
    </div>
  )
}

HeatmapBlock.propTypes = {
  title: React.PropTypes.string,
  contents: React.PropTypes.func,
  data: React.PropTypes.array,
}

export default HeatmapBlock
