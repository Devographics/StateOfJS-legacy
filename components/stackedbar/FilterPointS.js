import React from 'react'

class FilterPointS extends React.Component {
  componentDidMount () {
    this.context.setPointPosition("Satisfaction", this._ref.getBoundingClientRect().top)
  }
  render () {
    return <span ref={(e) => this._ref = e} style={{ fontSize: 0 }} />
  }
}

FilterPointS.contextTypes = {
  setPointPosition: React.PropTypes.func
};

export default FilterPointS