import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

export default class MapChartContinent extends Component {
    static propTypes = {
        path: PropTypes.func.isRequired
    }

    state = {
        color: '#212424'
    }

    handleMouseEnter = () => {
        this.setState({ color: '#444' })
    }

    handleMouseLeave = () => {
        this.setState({ color: '#212424' })
    }

    render() {
        const { path, features } = this.props
        const { color } = this.state

        return (
            <Fragment>
                {features.map((f, i) => (
                    <path
                        key={i}
                        style={{ cursor: 'pointer' }}
                        fill={color}
                        d={path(f)}
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}
                    />
                ))}
            </Fragment>
        )
    }
}
