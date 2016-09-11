import React from 'react'

class FilterPointI extends React.Component {
  componentDidMount () {
    this.context.setPointPosition("Interest", this._ref.getBoundingClientRect().top)
  }
  render () {
    return <span ref={(e) => this._ref = e} style={{ fontSize: 0 }} />
  }
}

FilterPointI.contextTypes = {
  setPointPosition: React.PropTypes.func
};

export default FilterPointI