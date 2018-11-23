import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import ToolsConnectionsLegends from '../elements/ToolsConnectionsLegends'
import { chordScale } from '../../constants'
import Block from 'core/blocks/Block'
import ToolsConnectionsChordChart from './ToolsConnectionsChordChart'

export default class ToolsConnectionsBlock extends Component {
    static propTypes = {
        data: PropTypes.shape({
            matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
            keys: PropTypes.arrayOf(PropTypes.string).isRequired,
            indexesBySection: PropTypes.arrayOf(
                PropTypes.shape({
                    section: PropTypes.string.isRequired,
                    indexes: PropTypes.arrayOf(PropTypes.number).isRequired
                })
            ).isRequired
        }).isRequired,
        chartId: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {
            sections: props.data.indexesBySection.map(s => s.section)
        }
    }

    handleSectionToggle = section => {
        const { sections } = this.state
        const isAlreadySelected = sections.includes(section)

        let newSections
        if (isAlreadySelected) {
            newSections = sections.filter(s => s !== section)
        } else {
            newSections = [...sections, section]
        }

        this.setState({ sections: newSections })
    }

    render() {
        const { data, chartId } = this.props
        const { sections: selectedSections } = this.state

        const toolIndexes = selectedSections.reduce((acc, section) => {
            const sectionIndexes = data.indexesBySection.find(s => s.section === section).indexes

            return [...acc, ...sectionIndexes]
        }, [])

        const toolKeys = []
        const filteredMatrix = data.matrix
            .filter((row, rowIndex) => {
                const includeRow = toolIndexes.includes(rowIndex)
                if (includeRow) toolKeys.push(data.keys[rowIndex])

                return includeRow
            })
            .map(row => row.filter((value, cellIndex) => toolIndexes.includes(cellIndex)))

        const getColor = tool => {
            const toolIndex = data.keys.findIndex(k => k === tool)
            const sectionIndex = data.indexesBySection.findIndex(s => s.indexes.includes(toolIndex))

            return chordScale[sectionIndex]
        }

        return (
            <Block id={chartId} showDescription={false} className="Block--chart Block--connections">
                {/* <ToolsConnectionsLegends
                    sections={data.indexesBySection.map(s => s.section)}
                    selectedSections={selectedSections}
                    onChange={this.handleSectionToggle}
                /> */}
                <ToolsConnectionsChordChart
                    getColor={getColor}
                    keys={toolKeys}
                    matrix={filteredMatrix}
                />
            </Block>
        )
    }
}
