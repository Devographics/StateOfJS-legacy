import React from 'react'

class FilterPoint extends React.Component {
  componentDidMount () {
    this.context.setPointPosition("Satisfaction", this._ref.getBoundingClientRect().top)
  }
  render () {
    console.log(this.props)
    return <span ref={(e) => this._ref = e} style={{ fontSize: 0 }} />
  }
}

FilterPoint.contextTypes = {
  setPointPosition: React.PropTypes.func
};

// FilterPoint.getWindow = () => {
//   if (typeof window !== 'undefined') {
//     return window
//   }
// }

export default FilterPoint