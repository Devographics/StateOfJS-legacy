import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Legends extends Component {
    static propTypes = {
        legends: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                color: PropTypes.string.isRequired
            })
        ).isRequired,
        modifier: PropTypes.string,
        style: PropTypes.object.isRequired,
        itemStyle: PropTypes.object.isRequired
    }

    static defaultProps = {
        style: {},
        itemStyle: {}
    }

    render() {
        const { legends, modifier, style, itemStyle } = this.props

        return (
            <div className={`Legends${modifier ? ` Legends--${modifier}` : ''}`} style={style}>
                <div className="Legends__Inner">
                    {legends.map(({ label, color }) => (
                        <div className="Legends__Item" key={label} style={itemStyle}>
                            <span className="Legends__Item__Chip" style={{ background: color }} />
                            {label}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
