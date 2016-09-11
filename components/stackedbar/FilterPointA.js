import React from 'react'

class FilterPointA extends React.Component {
  componentDidMount () {
    this.context.setPointPosition("All", this._ref.getBoundingClientRect().top)
  }
  render () {
    return <span ref={(e) => this._ref = e} style={{ fontSize: 0 }} />
  }
}

FilterPointA.contextTypes = {
  setPointPosition: React.PropTypes.func
};

export default FilterPointA