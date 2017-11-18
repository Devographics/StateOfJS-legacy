import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveTreeMapHtml } from 'nivo'
import { colors } from '../../constants'

const NodeComponent = setCurrentTool => ({ node, style, handlers }) => {
    if (style.width <= 0 || style.height <= 0) return null

    const rotate = node.label && style.orientLabel && style.height > style.width

    return (
        <div
            style={{
                boxSizing: 'border-box',
                position: 'absolute',
                textAlign: 'center',
                top: style.y,
                left: style.x,
                width: style.width,
                height: style.height,
                background: style.color,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: style.borderWidth,
                borderStyle: 'solid',
                borderColor: style.borderColor,
                cursor: 'pointer',
            }}
            {...handlers}
        >
            {node.label !== false && (
                <span
                    style={{
                        color: style.labelTextColor,
                        transform: `rotate(${rotate ? '-90' : '0'}deg)`,
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        MsUserSelect: 'none',
                        userSelect: 'none',
                    }}
                >
                    {node.label}
                </span>
            )}
        </div>
    )
}

NodeComponent.propTypes = {
    node: PropTypes.object.isRequired,
    style: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.string.isRequired,
        labelTextColor: PropTypes.string.isRequired,
        orientLabel: PropTypes.bool.isRequired,
    }).isRequired,
    handlers: PropTypes.object.isRequired,
}

export default class CountryTreeMap extends PureComponent {
    static propTypes = {
        keys: PropTypes.arrayOf(PropTypes.string).isRequired,
        data: PropTypes.shape({
            key: PropTypes.string.isRequired,
        }).isRequired,
        setCurrentTool: PropTypes.func.isRequired,
        currentTool: PropTypes.string,
    }

    render() {
        const { keys, data, setCurrentTool, currentTool } = this.props

        const getColor = ({ id }) => {
            if (currentTool !== null && id !== currentTool) return colors.purpleLight
            return colors.purple
        }

        return (
            <ResponsiveTreeMapHtml
                //colorBy={getColor}
                colorBy="id"
                colors="d320b"
                innerPadding={2}
                leavesOnly={true}
                labelTextColor={colors.greyLight}
                labelSkipSize={24}
                nodeComponent={NodeComponent(setCurrentTool)}
                animate={false}
                root={{
                    id: data.key,
                    children: keys.map(key => ({
                        id: key,
                        value: data[key].doc_count,
                    })),
                }}
            />
        )
    }
}
