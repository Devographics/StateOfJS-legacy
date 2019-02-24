import React from 'react'
import PropTypes from 'prop-types'
import periodicTableData from 'data/periodic_table.yml'
import PeriodicElement from 'core/components/PeriodicElement'
import Trans from 'core/i18n/Trans'
import { getToolName } from 'core/helpers/tools'

const hoverDistance = 60

/**
 * Take x and y distances, and return distances we want
 * to move the element by to avoid collision
 */
const getHoverCoords = ({ dx, dy }) => {
    return {
        dx: dx < 0 ? hoverDistance : -hoverDistance,
        dy: dy < 0 ? hoverDistance : -hoverDistance
    }
}

const QuadrantChartNode = ({ data, id, x, y, collisionData }) => {
    return (
        <Trans>
            {translate => (
                <PeriodicElement
                    className={`Quadrants__Chart__PeriodicTableElement ${
                        collisionData ? 'Quadrants__Chart__PeriodicTableElement--collision' : ''
                    }`}
                    x={x}
                    y={y}
                    symbol={periodicTableData.tools[id]}
                    name={getToolName(id, translate)}
                    number={`${data.s}%`}
                    fire={data.i > 50}
                    size={55}
                    hoverCoords={getHoverCoords(collisionData)}
                />
            )}
        </Trans>
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
