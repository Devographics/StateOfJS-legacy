import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LegendsItem from './LegendsItem'

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
        chipStyle: PropTypes.object.isRequired,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onClick: PropTypes.func
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
        const {
            layout,
            withFrame,
            legends,
            chipSize,
            style,
            itemStyle,
            chipStyle,
            onMouseEnter,
            onMouseLeave,
            onClick
        } = this.props

        const classNames = ['Legends', `Legends--${layout}`]
        if (withFrame === true) {
            classNames.push('Legends--withFrame')
        }

        const rootStyle = { ...style }

        return (
            <div className={classNames.join(' ')} style={rootStyle}>
                {legends.map(({ id, label, color }) => (
                    <LegendsItem
                        key={id}
                        id={id}
                        label={label}
                        color={color}
                        style={itemStyle}
                        chipSize={chipSize}
                        chipStyle={chipStyle}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        onClick={onClick}
                    />
                ))}
            </div>
        )
    }
}
