import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import theme from 'nivoTheme'
import { colors } from '../../constants'
import Trans from 'core/i18n/Trans'

const margin = {
    top: 10,
    right: 52,
    bottom: 46,
    left: 32
}

export default class VerticalBarChart extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                range: PropTypes.string.isRequired,
                count: PropTypes.number.isRequired,
                percentage: PropTypes.number.isRequired
            })
        ).isRequired,
        keys: PropTypes.arrayOf(PropTypes.string).isRequired,
        i18nNamespace: PropTypes.string.isRequired
    }

    getTickLabel = translate => range => {
        const { i18nNamespace } = this.props

        return translate(`${i18nNamespace}.${range}.short`)
    }

    renderTooltip = translate => props => {
        const { i18nNamespace } = this.props

        return (
            <span>
                {translate(`${i18nNamespace}.${props.indexValue}.long`)}
                :&nbsp;
                <strong>{props.value}%</strong>
            </span>
        )
    }

    render() {
        const { data, keys, i18nNamespace } = this.props

        const chartData = keys.map(key => data.find(d => d.range === key))

        return (
            <Trans>
                {translate => (
                    <div
                        style={{
                            height: 260
                        }}
                    >
                        <ResponsiveBar
                            theme={theme}
                            colors={[colors.blue]}
                            margin={margin}
                            padding={0.4}
                            maxValue={30}
                            keys={['percentage']}
                            indexBy="range"
                            data={chartData}
                            labelFormat={d => `${d}%`}
                            // labelTextColor="#111"
                            enableGridX={false}
                            enableGridY={true}
                            gridYValues={[0, 5, 10, 15, 20, 25, 30]}
                            axisRight={{
                                tickValues: 7,
                                format: d => `${d}%`,
                                legend: translate('users_percentage'),
                                legendPosition: 'middle',
                                legendOffset: 46
                            }}
                            axisLeft={{
                                tickValues: 7,
                                format: d => `${d}%`
                            }}
                            axisBottom={{
                                format: this.getTickLabel(translate),
                                legend: translate(`${i18nNamespace}_axis_legend`),
                                legendPosition: 'middle',
                                legendOffset: 40
                            }}
                            animate={false}
                            tooltip={this.renderTooltip(translate)}
                        />
                    </div>
                )}
            </Trans>
        )
    }
}
