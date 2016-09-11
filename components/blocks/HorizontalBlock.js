import React from 'react'
import { StickyContainer, Sticky } from 'react-sticky'
import HorizontalBar from '../horizontalbar/HorizontalBar.js'

const HorizontalBlock = props => {
  return (
    <div className="section">
      <StickyContainer className="sticky-container">
        <Sticky className="sticky">
          <HorizontalBar title={props.chartTitle} data={props.data} />
        </Sticky>
      </StickyContainer>

      <div className="section-contents">
        <h1>{props.title}</h1>
        <props.contents />
      </div>
    </div>
  )
}

HorizontalBlock.propTypes = {
  title: React.PropTypes.string,
  contents: React.PropTypes.func,
  data: React.PropTypes.array,
}

export default HorizontalBlock
