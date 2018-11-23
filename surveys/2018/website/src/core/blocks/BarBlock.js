import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BarChart from '../charts/BarChart'
import Block from './Block'

export default class BarBlock extends Component {
    state = {
        mode: 'compare'
    }

    static propTypes = {
        description: PropTypes.string,
        title: PropTypes.string,
        chartId: PropTypes.string.isRequired,
        data: PropTypes.array.isRequired,
        showDescription: PropTypes.bool.isRequired
    }

    static defaultProps = {
        showDescription: true
    }

    render() {
        const { data, chartId, values, showDescription } = this.props

        return (
            <Block
                id={chartId}
                values={values}
                showDescription={showDescription}
                className="block--chart block--othersbar"
            >
                <BarChart data={data} />
            </Block>
        )
    }
}
