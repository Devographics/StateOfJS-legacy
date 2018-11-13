import React, { Component } from 'react'

// https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id/6860916#6860916
const getID = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)

class ChartRatioContainer extends Component {
    state = {
        height: null,
        width: null,
        id: `ratioContainer_${getID()}`
    }

    getHeight = width => {
        const { ratio, maxHeight = 999999 } = this.props
        if (width) {
            const height = width * ratio
            return Math.min(height, maxHeight)
        }
    }

    componentDidMount() {
        const { id } = this.state
        const element = document.getElementById(id)
        const width = element.clientWidth
        this.setState({ width, height: this.getHeight(width) })
    }

    render() {
        const { children } = this.props
        const { id, height } = this.state
        return (
            <div id={id} className="Chart__RatioContainer">
                {height && <div style={{ height }}>{children}</div>}
            </div>
        )
    }
}

export default ChartRatioContainer
