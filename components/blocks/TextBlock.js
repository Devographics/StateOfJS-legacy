import React from 'react'

const TextBlock = props => {
  return (
    <div className="section section-layout-b">
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
