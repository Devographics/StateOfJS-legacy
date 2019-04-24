import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { sortBy } from 'lodash'
import { ResponsiveBar } from '@nivo/bar'
import { navigate } from 'gatsby'
import theme from 'nivoTheme'
import ranking from 'data/results/tools_ranking.yml'
import periodicTableData from 'data/periodic_table.yml'
import { getToolName } from 'core/helpers/tools'
import DisplayModeSwitch from 'core/components/DisplayModeSwitch'
import OpinionsLegends from 'core/charts/OpinionsLegends'
import PeriodicElement from 'core/components/PeriodicElement'
import ChartContainer from 'core/charts/ChartContainer'
import Trans from 'core/i18n/Trans'
import { PageContextConsumer } from '../../../core/helpers/pageContext'

const patterns = [
    {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: 'rgba(0, 0, 0, .07)',
        rotation: -45,
        lineWidth: 3,
        spacing: 6
    }
]

const margin = {
    top: 81,
    bottom: 30
}

export default class OverviewChart extends Component {
    static propTypes = {
        section: PropTypes.string.isRequired,
        opinions: PropTypes.arrayOf(
            PropTypes.shape({
                survey_id: PropTypes.string.isRequired
            })
        ).isRequired
    }

    state = {
        current: null,
        displayMode: 'percents'
    }

    setCurrent = legend => {
        this.setState({ current: legend.id })
    }

    resetCurrent = () => {
        this.setState({ current: null })
    }

    setDisplayMode = displayMode => {
        this.setState({ displayMode })
    }

    getColor = ({ id }) => {
        const { current } = this.state
        if (current !== null && current !== id) {
            return `${theme.opinionColors[id]}33`
        }

        return theme.opinionColors[id]
    }

    render() {
        const { section, opinions } = this.props
        const { displayMode } = this.state

        const surveyData = opinions.find(o => o.survey_id === '2018')
        if (surveyData === undefined) {
            return (
                <div style={{ color: 'red' }}>
                    No data found found for survey: <strong>2018</strong>
                    <br />
                    <br />
                </div>
            )
        }

        const sortedData = sortBy(
            surveyData.tools.map(t => ({
                tool_id: t.tool_id,
                ...t[displayMode === 'percents' ? 'percentages' : 'counts']
            })),
            'would_use'
        ).reverse()

        let format = v => v
        if (displayMode === 'percents') {
            format = v => `${v}%`
        }

        return (
            <PageContextConsumer>
                {pageContext => (
                    <Trans>
                        {translate => (
                            <div className="Overview__Chart">
                                <ChartContainer height={360}>
                                    <ResponsiveBar
                                        margin={margin}
                                        keys={[
                                            'would_use',
                                            'would_not_use',
                                            'interested',
                                            'not_interested',
                                            'never_heard'
                                        ]}
                                        indexBy="tool_id"
                                        data={sortedData}
                                        theme={theme}
                                        colorBy={this.getColor}
                                        labelFormat={format}
                                        tooltipFormat={format}
                                        labelTextColor="inherit:darker(2)"
                                        labelSkipWidth={32}
                                        labelSkipHeight={20}
                                        padding={0.6}
                                        axisLeft={null}
                                        enableGridY={false}
                                        axisTop={{
                                            renderTick: tick => (
                                                <g
                                                    key={tick.key}
                                                    transform={`translate(${tick.x - 30},${tick.y -
                                                        80})`}
                                                >
                                                    <PeriodicElement
                                                        mode="chart"
                                                        section={section}
                                                        tool={tick.value}
                                                        symbol={
                                                            periodicTableData.tools[tick.value] ||
                                                            '??'
                                                        }
                                                        name={getToolName(tick.value, translate)}
                                                        size={60}
                                                        number={ranking[tick.value]}
                                                        path={`${
                                                            pageContext.localePath
                                                        }/${section}/${tick.value}`}
                                                    />
                                                </g>
                                            )
                                        }}
                                        axisBottom={{
                                            tickSize: 0,
                                            tickPadding: 10,
                                            renderTick: tick => (
                                                <g
                                                    key={tick.key}
                                                    transform={`translate(${tick.x},${tick.y +
                                                        14})`}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        navigate(`${section}/${tick.value}`)
                                                    }}
                                                >
                                                    <text
                                                        fill="#41c7c7"
                                                        textAnchor="middle"
                                                        alignmentBaseline="hanging"
                                                        style={{ fontSize: '13px' }}
                                                    >
                                                        {getToolName(tick.value, translate)}
                                                    </text>
                                                </g>
                                            )
                                        }}
                                        defs={patterns}
                                        fill={[
                                            {
                                                match: {
                                                    id: 'never_heard'
                                                },
                                                id: 'lines'
                                            }
                                        ]}
                                        tooltipLabel={d =>
                                            translate(`opinions.legends_short.${d.id}`)
                                        }
                                    />
                                </ChartContainer>
                                <div>
                                    <div className="Overview__Chart__SwitchContainer">
                                        <DisplayModeSwitch
                                            mode={displayMode}
                                            onChange={this.setDisplayMode}
                                        />
                                    </div>
                                    <OpinionsLegends
                                        layout="vertical"
                                        withFrame={false}
                                        onMouseEnter={this.setCurrent}
                                        onMouseLeave={this.resetCurrent}
                                    />
                                </div>
                            </div>
                        )}
                    </Trans>
                )}
            </PageContextConsumer>
        )
    }
}
