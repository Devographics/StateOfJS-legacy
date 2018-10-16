import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Legends extends Component {
    static propTypes = {
        legends: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                label: PropTypes.string.isRequired,
                color: PropTypes.string.isRequired
            })
        ).isRequired,
        layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
        withFrame: PropTypes.bool.isRequired,
        chipSize: PropTypes.number.isRequired,
        modifier: PropTypes.string,
        style: PropTypes.object.isRequired,
        itemStyle: PropTypes.object.isRequired,
        chipStyle: PropTypes.object.isRequired
    }

    static defaultProps = {
        layout: 'horizontal',
        withFrame: true,
        style: {},
        itemStyle: {},
        chipStyle: {},
        chipSize: 16
    }

    render() {
        const { layout, withFrame, legends, chipSize, style, itemStyle, chipStyle } = this.props

        const classNames = ['Legends', `Legends--${layout}`]
        if (withFrame === true) {
            classNames.push('Legends--withFrame')
        }

        const rootStyle = { ...style }
        if (layout === 'horizontal') {
            rootStyle.gridTemplateColumns = '1fr '.repeat(legends.length).trim()
        }

        return (
            <div className={classNames.join(' ')} style={rootStyle}>
                {legends.map(({ label, color }) => (
                    <div key={label} className="Legends__Item" style={{ ...itemStyle }}>
                        <span
                            className="Legends__Item__Chip"
                            style={{
                                width: chipSize,
                                height: chipSize,
                                background: color,
                                ...chipStyle
                            }}
                        />
                        {label}
                    </div>
                ))}
            </div>
        )
    }
}
