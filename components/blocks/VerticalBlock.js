import React from 'react'
import { StickyContainer, Sticky } from 'react-sticky'
import VerticalBar from '../verticalbar/VerticalBar.js'
import SectionTitle from './SectionTitle.js'

const VerticalBlock = (props, context) => {
  return (
    <div className="section">
      {props.title ? <SectionTitle title={props.title} /> : null}
      <div className="section-inner">
        <StickyContainer className="sticky-container">
          <Sticky isActive={context.sticky} className="sticky">
            <VerticalBar {...props} />
          </Sticky>
        </StickyContainer>

        <div className="section-contents">
          <props.contents />
        </div>
      </div>
    </div>
  )
}

VerticalBlock.propTypes = {
  title: React.PropTypes.string,
  contents: React.PropTypes.func,
  data: React.PropTypes.array,
}

VerticalBlock.contextTypes = {
  sticky: React.PropTypes.bool,
}

export default VerticalBlock
