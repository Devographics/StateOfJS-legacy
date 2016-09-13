import React from 'react'
import { StickyContainer, Sticky } from 'react-sticky'
import VerticalBar from '../verticalbar/VerticalBar.js'

const VerticalBlock = props => {
  return (
    <div className="section">
      <StickyContainer className="sticky-container">
        <Sticky className="sticky">
          <VerticalBar {...props} />
        </Sticky>
      </StickyContainer>

      <div className="section-contents">
        <props.contents />
      </div>
    </div>
  )
}

VerticalBlock.propTypes = {
  title: React.PropTypes.string,
  contents: React.PropTypes.func,
  data: React.PropTypes.array,
}

export default VerticalBlock
