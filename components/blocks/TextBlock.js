import React from 'react'
import SectionTitle from './SectionTitle.js'
import classNames from 'classnames'

const TextBlock = props => {
  return (
    <div className={classNames('section', 'section-layout-b', props.className)}>
      {props.title ? <SectionTitle title={props.title} /> : null}
      <div className="section-contents-wide">
        <props.contents />
      </div>
    </div>
  )
}

TextBlock.propTypes = {
  title: React.PropTypes.string,
  contents: React.PropTypes.func,
}

export default TextBlock
