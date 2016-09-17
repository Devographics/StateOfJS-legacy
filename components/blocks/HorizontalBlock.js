import React from 'react'
import { StickyContainer, Sticky } from 'react-sticky'
import HorizontalBar from '../horizontalbar/HorizontalBar.js'
import SectionTitle from './SectionTitle.js'

const HorizontalBlock = props => {
  return (
    <div className="section">
      {props.title ? <SectionTitle title={props.title} /> : null}
      <div className="section-inner">
        <StickyContainer className="sticky-container">
          <Sticky className="sticky">
            <HorizontalBar title={props.chartTitle} data={props.data} />
          </Sticky>
        </StickyContainer>

        <div className="section-contents">
          <props.contents />
        </div>
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
