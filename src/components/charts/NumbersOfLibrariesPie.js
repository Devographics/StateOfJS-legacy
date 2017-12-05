import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResponsivePie } from '@nivo/pie'
import { scaleLinear } from 'd3-scale'
import { colorScale } from '../../constants.js'

const margin = {
    top: 40,
    right: 100,
    bottom: 40,
    left: 100,
}

const getSliceLabel = d => {
    if (d.id === '0') return 'none'
    if (d.id === '1') return 'one lib'
    return `${d.id} libs`
}

const getRadialLabel = d => {
    if (d.id === '0') return 'Satisfied with none of them'
    if (d.id === '1') return 'Only using one library'
    return `Using ${d.id} libraries`
}

export default class NumbersOfLibrariesPie extends Component {
    static propTypes = {
        keys: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.number.isRequired,
                doc_count: PropTypes.number.isRequired,
            })
        ).isRequired,
    }

    render() {
        const { keys, data } = this.props

        // const colorScale = scaleLinear()
        //     .domain([0, 1, keys.length])
        //     .range(['#dadada', '#9688e4', '#ea2149'])

        const getColor = ({ id }) => ['#F4F6F4', ...colorScale][id]

        return (
            <ResponsivePie
                data={data.map(({ key, doc_count }) => ({
                    id: `${key}`,
                    label: `${key}`,
                    value: doc_count,
                }))}
                colorBy={getColor}
                margin={margin}
                innerRadius={0.6}
                padAngle={0.6}
                cornerRadius={3}
                radialLabelsSkipAngle={10}
                radialLabel={getRadialLabel}
                radialLabelsLinkColor="inherit"
                slicesLabelsSkipAngle={10}
                sliceLabel={getSliceLabel}
            />
        )
    }
}
