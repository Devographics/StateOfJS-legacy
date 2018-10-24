import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { getToolName } from '../../helpers/wording'

const QuadrantChartNode = ({ data, x, y, r, styles }) => {
    return (
        <Fragment>
            <circle cx={x} cy={y} r={r} fill={styles.circlesColor} fillOpacity="0.9" />
            <text
                fontSize={Math.max(8, r * 0.7)}
                textAnchor="middle"
                alignmentBaseline="central"
                x={x}
                y={y}
                fontWeight="normal"
                fill={'#333'}
                className="Quadrants__Chart__value"
            >
                {data.i}%
            </text>
            <text
                alignmentBaseline="central"
                x={x + r + 5}
                y={y}
                fill={styles.labelsColor}
                className="Quadrants__Chart__label"
            >
                {getToolName(data.id)}
            </text>
        </Fragment>
    )
}

QuadrantChartNode.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        u: PropTypes.number.isRequired,
        s: PropTypes.number.isRequired,
        i: PropTypes.number.isRequired
    }).isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
    styles: PropTypes.shape({
        circlesColor: PropTypes.string.isRequired,
        labelsColor: PropTypes.string.isRequired
    }).isRequired
}

export default QuadrantChartNode
