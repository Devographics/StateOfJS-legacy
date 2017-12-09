import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResponsivePie } from '@nivo/pie'
import { patternLinesDef } from '@nivo/core'
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

const noneColor = '#d9dbd9'
const colors = [noneColor, ...colorScale]

const defs = [
    patternLinesDef('lines', {
        color: 'inherit',
        background: 'transparent',
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
    }),
]
const fill = [{ match: { id: '0' }, id: 'lines' }]

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
        const { data } = this.props

        const getColor = ({ id }) => colors[id]

        // small values generate artifacts when used with cornerRadius & padAngle
        // also not that `60` is quite arbitrary and is probably only suited for 2017 results
        const filteredData = data.filter(d => d.doc_count > 60)

        return (
            <ResponsivePie
                data={filteredData.map(({ key, doc_count }) => ({
                    id: `${key}`,
                    label: `${key}`,
                    value: doc_count,
                }))}
                colorBy={getColor}
                defs={defs}
                fill={fill}
                borderWidth={1}
                borderColor="inherit"
                margin={margin}
                innerRadius={0.6}
                padAngle={0.7}
                cornerRadius={2}
                radialLabelsSkipAngle={10}
                radialLabel={getRadialLabel}
                radialLabelsLinkColor="inherit"
                slicesLabelsSkipAngle={10}
                sliceLabel={getSliceLabel}
            />
        )
    }
}
