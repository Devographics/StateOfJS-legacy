import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BlockTitle from '../elements/BlockTitle'
import ChartContainer from '../elements/ChartContainer'
import SalariesBarChart from '../charts/SalariesBarChart'

const chartId = 'salaries'

export default class SalariesBlock extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                survey: PropTypes.string.isRequired,
                average: PropTypes.number.isRequired,
                ranges: PropTypes.arrayOf(
                    PropTypes.shape({
                        range: PropTypes.string.isRequired,
                        count: PropTypes.number.isRequired,
                        percentage: PropTypes.number.isRequired
                    })
                ).isRequired
            })
        ).isRequired
    }

    render() {
        const chartData = this.props.data.find(d => d.survey === '2018').ranges

        return (
            <div className="block" id={chartId}>
                <BlockTitle chartId={chartId} />
                <ChartContainer>
                    <SalariesBarChart data={chartData} />
                </ChartContainer>
            </div>
        )
    }
}
