import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveLine } from '@nivo/line'
import theme from '../../nivoTheme'
import { colors } from '../../constants'

const years = ['2016', '2017', '2018']

const horizontalAxis = {
    tickSize: 10,
    tickPadding: 6
}
const verticalAxis = {
    tickValues: [1, 5],
    tickPadding: 16,
    renderTick: d => {
        let text = ''
        if (d.value === 1) text = '☹️'
        if (d.value === 5) text = '🙂'
        return (
            <text
                key={d.key}
                style={{ fontSize: 24 }}
                x={d.x + d.textX}
                y={d.y}
                textAnchor={d.textAnchor}
                alignmentBaseline="middle"
            >
                {text}
            </text>
        )
    }
}

export default class HappinessTrendChart extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                survey: PropTypes.string.isRequired,
                average: PropTypes.number.isRequired,
                scores: PropTypes.arrayOf(
                    PropTypes.shape({
                        score: PropTypes.number.isRequired,
                        count: PropTypes.number.isRequired,
                        percentage: PropTypes.number.isRequired
                    })
                ).isRequired
            })
        ).isRequired
    }

    render() {
        const { data } = this.props

        const chartData = years.map(year => {
            const yearData = data.find(d => d.survey === year)

            return {
                x: year,
                y: yearData.average + 1
            }
        })

        return (
            <div style={{ height: 240 }}>
                <ResponsiveLine
                    theme={{
                        ...theme,
                        axis: theme.streamTimelineAxis,
                        dots: {
                            text: {
                                fontFamily: `'IBM Plex Mono', 'Space Grotesk', 'Roboto Slab', sans-serif`,
                                fontWeight: 600,
                                fontSize: 12,
                                fill: '#e1e1e1'
                            }
                        }
                    }}
                    colors={[colors.red]}
                    lineWidth={4}
                    margin={{
                        top: 40,
                        right: 60,
                        bottom: 40,
                        left: 60
                    }}
                    yScale={{
                        type: 'linear',
                        min: 1,
                        max: 5
                    }}
                    data={[
                        {
                            id: 'Happiness',
                            data: chartData
                        }
                    ]}
                    gridYValues={[1, 3, 5]}
                    axisTop={horizontalAxis}
                    axisRight={verticalAxis}
                    axisBottom={horizontalAxis}
                    axisLeft={verticalAxis}
                    enableDotLabel={true}
                    dotLabelYOffset={4}
                    dotSize={42}
                    dotColor="#212424"
                    dotBorderColor={colors.red}
                    dotBorderWidth={4}
                    isInteractive={false}
                    animate={false}
                />
            </div>
        )
    }
}
