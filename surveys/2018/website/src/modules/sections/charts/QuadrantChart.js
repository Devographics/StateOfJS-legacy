import React from 'react'
import PropTypes from 'prop-types'
import { scaleLinear } from 'd3-scale'
import { format } from 'd3-format'
import Trans from 'core/i18n/Trans'
import QuadrantChartNode from './QuadrantChartNode'

const styles = {
    labelsColor: '#E8E8E8',
    ticksColor: '#E8E8E8',
    tickLineWidth: 1,
    circlesColor: '#E8E8E8',
    quadrantsBackground: '#fe6a6a'
}

const dimensions = {
    width: 400,
    height: 300,
    margin: {
        top: 60,
        right: 60,
        bottom: 60,
        left: 70
    },
    padding: {
        top: 0,
        right: 20,
        bottom: 0,
        left: 20
    },
    circle: {
        minRadius: 8,
        maxRadius: 25
    }
}

const xFormatter = format('.02s')

const mapData = opinions =>
    opinions.map(({ tool_id, counts }) => {
        const totalUsage = counts.would_use + counts.would_not_use
        const totalInterest = counts.interested + counts.not_interested

        return {
            id: tool_id,
            // u: usage (0 to n, in thousands of users)
            u: totalUsage,
            // s: satisfaction (0 to 100)
            s: Math.round((counts.would_use / totalUsage) * 100),
            // i: interest ratio (0 to 100)
            i: Math.round((counts.interested / totalInterest) * 100)
        }
    })

const collisionDistance = 40

const detectCollision = (collisionPositions, x1, y1) => {
    let collisionData = false
    for (let i = 0; i < collisionPositions.length; i++) {
        const [x2, y2] = collisionPositions[i]
        const dx = Math.abs(x1 - x2)
        const dy = Math.abs(y1 - y2)

        if (dx < collisionDistance && dy < collisionDistance) {
            collisionData = { dx, dy }
            break
        }
    }

    collisionPositions.push([x1, y1])
    return collisionData
}

const QuadrantChart = ({ tools }) => {
    const data = mapData(tools)

    const innerWidth = dimensions.width - dimensions.padding.left - dimensions.padding.right
    const innerHeight = dimensions.height - dimensions.padding.top - dimensions.padding.bottom

    const outerWidth = dimensions.margin.left + dimensions.width + dimensions.margin.right
    const outerHeight = dimensions.margin.top + dimensions.height + dimensions.margin.bottom

    const halfWidth = dimensions.width / 2
    const halfHeight = dimensions.height / 2

    const xScale = scaleLinear()
        .domain([0, Math.max(...data.map(d => d.u))])
        .range([0, innerWidth])
        .nice()
    const xTicks = xScale.ticks(7)

    const yScale = scaleLinear()
        .domain([0, 100])
        .range([innerHeight, 0])
    const yTicks = yScale.ticks(11)

    const radiusScale = scaleLinear()
        .domain([0, 100])
        .range([dimensions.circle.minRadius, dimensions.circle.maxRadius])

    const collisionPositions = []

    return (
        <Trans>
            {translate => (
                <div className="Quadrants__Wrapper">
                    <div className="Quadrants__Chart">
                        <svg
                            width="100%"
                            viewBox={`0 0 ${outerWidth} ${outerHeight}`}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g
                                transform={`translate(${dimensions.margin.left},${
                                    dimensions.margin.top
                                })`}
                            >
                                {/* quadrants */}
                                <rect
                                    width={halfWidth}
                                    height={halfHeight}
                                    fill={styles.quadrantsBackground}
                                    fillOpacity="0.5"
                                />
                                <rect
                                    x={halfWidth}
                                    width={halfWidth}
                                    height={halfHeight}
                                    fill={styles.quadrantsBackground}
                                />
                                <rect
                                    y={halfHeight}
                                    width={halfWidth}
                                    height={halfHeight}
                                    fill={styles.quadrantsBackground}
                                    fillOpacity="0.2"
                                />
                                <rect
                                    x={halfWidth}
                                    y={halfHeight}
                                    width={halfWidth}
                                    height={halfHeight}
                                    fill={styles.quadrantsBackground}
                                    fillOpacity="0.5"
                                />

                                {/* quadrant labels */}
                                <text
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                    x={dimensions.width * 0.25}
                                    y={dimensions.height * 0.25}
                                    fill={styles.labelsColor}
                                    className="Quadrants__Chart__QuadrantLabel"
                                    fillOpacity="0.6"
                                >
                                    {translate('quadrant.assess.label')}
                                </text>
                                <text
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                    x={dimensions.width * 0.25}
                                    y={dimensions.height * 0.75}
                                    fill={styles.labelsColor}
                                    className="Quadrants__Chart__QuadrantLabel"
                                    fillOpacity="0.6"
                                >
                                    {translate('quadrant.avoid.label')}
                                </text>
                                <text
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                    x={dimensions.width * 0.75}
                                    y={dimensions.height * 0.25}
                                    fill={styles.labelsColor}
                                    className="Quadrants__Chart__QuadrantLabel"
                                    fillOpacity="0.7"
                                >
                                    {translate('quadrant.adopt.label')}
                                </text>
                                <text
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                    x={dimensions.width * 0.75}
                                    y={dimensions.height * 0.75}
                                    fill={styles.labelsColor}
                                    className="Quadrants__Chart__QuadrantLabel"
                                    fillOpacity="0.6"
                                >
                                    {translate('quadrant.analyze.label')}
                                </text>

                                {/* points */}
                                <g
                                    transform={`translate(${dimensions.padding.left},${
                                        dimensions.padding.top
                                    })`}
                                >
                                    {data.map(d => (
                                        <QuadrantChartNode
                                            key={d.id}
                                            id={d.id}
                                            data={d}
                                            x={xScale(d.u)}
                                            y={yScale(d.s)}
                                            r={radiusScale(d.i)}
                                            styles={styles}
                                            collisionData={detectCollision(
                                                collisionPositions,
                                                xScale(d.u),
                                                yScale(d.s)
                                            )}
                                        />
                                    ))}
                                </g>

                                {/* x axis ticks */}
                                <g
                                    transform={`translate(${dimensions.padding.left},${
                                        dimensions.height
                                    })`}
                                >
                                    {xTicks.map(d => {
                                        const x = xScale(d)

                                        return (
                                            <g key={d} transform={`translate(${x},0)`}>
                                                <line
                                                    fill="none"
                                                    stroke={styles.ticksColor}
                                                    strokeWidth={styles.tickLineWidth}
                                                    y1={0}
                                                    y2={5}
                                                />
                                                <text
                                                    y={10}
                                                    textAnchor="middle"
                                                    alignmentBaseline="hanging"
                                                    className="Quadrants__Chart__TickLabel"
                                                    fill={styles.labelsColor}
                                                >
                                                    {xFormatter(d)}
                                                </text>
                                            </g>
                                        )
                                    })}
                                </g>

                                {/* y axis ticks */}
                                <g transform={`translate(0,${dimensions.padding.top})`}>
                                    {yTicks.map(d => {
                                        const y = yScale(d)

                                        return (
                                            <g key={d} transform={`translate(0,${y})`}>
                                                <line
                                                    fill="none"
                                                    stroke={styles.ticksColor}
                                                    strokeWidth={styles.tickLineWidth}
                                                    x1={-5}
                                                    x2={0}
                                                />
                                                <text
                                                    x={-10}
                                                    textAnchor="end"
                                                    alignmentBaseline="middle"
                                                    className="Quadrants__Chart__TickLabel"
                                                    fill={styles.labelsColor}
                                                >
                                                    {d}%
                                                </text>
                                            </g>
                                        )
                                    })}
                                </g>

                                {/* axis labels */}
                                <text
                                    textAnchor="middle"
                                    alignmentBaseline="baseline"
                                    transform={`translate(${-50},${halfHeight}) rotate(270)`}
                                    fill={styles.labelsColor}
                                    className="Quadrants__Chart__Legend"
                                >
                                    {translate('quadrant.satisfaction_legend')}
                                </text>
                                <text
                                    textAnchor="middle"
                                    alignmentBaseline="hanging"
                                    x={halfWidth}
                                    y={dimensions.height + 30}
                                    fill={styles.labelsColor}
                                    className="Quadrants__Chart__Legend"
                                >
                                    {translate('quadrant.users_legend')}
                                </text>
                            </g>
                        </svg>
                    </div>
                </div>
            )}
        </Trans>
    )
}

QuadrantChart.propTypes = {
    tools: PropTypes.arrayOf(
        PropTypes.shape({
            tool_id: PropTypes.string.isRequired,
            counts: PropTypes.shape({
                would_use: PropTypes.number.isRequired,
                would_not_use: PropTypes.number.isRequired,
                interested: PropTypes.number.isRequired,
                not_interested: PropTypes.number.isRequired,
                never_heard: PropTypes.number.isRequired
            }).isRequired
        })
    ).isRequired
}

export default QuadrantChart
