import React, { Component } from 'react'

class ChartRatioContainer extends Component {
    constructor(props) {
        super(props)
        this.containerRef = React.createRef()
        this.state = {
            height: null,
            width: null
        }
    }

    getHeight = width => {
        const { ratio, maxHeight = 999999 } = this.props
        if (width) {
            const height = width * ratio
            return Math.min(height, maxHeight)
        }
    }

    componentDidMount() {
        const element = this.containerRef.current
        const width = element.clientWidth
        this.setState({ width, height: this.getHeight(width) })
    }

    render() {
        const { children } = this.props
        const { height } = this.state
        return (
            <div className="Chart__RatioContainer" ref={this.containerRef}>
                {height && <div style={{ height }}>{children}</div>}
            </div>
        )
    }
}

export default ChartRatioContainer
