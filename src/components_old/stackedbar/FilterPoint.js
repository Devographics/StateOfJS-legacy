import React from 'react'

class FilterPoint extends React.Component {
    componentDidMount() {
        const point = this.props.line
        this.context.setPointPosition(point, this._ref.getBoundingClientRect().top)
    }
    render() {
        return <span ref={e => (this._ref = e)} style={{ fontSize: 0 }} />
    }
}

FilterPoint.contextTypes = {
    setPointPosition: React.PropTypes.func,
}

export default FilterPoint
