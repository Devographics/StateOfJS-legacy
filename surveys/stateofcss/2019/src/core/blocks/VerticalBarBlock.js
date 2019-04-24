import React from 'react'
import { keys } from '../../constants'
import Block from 'core/components/Block'
import ChartContainer from 'core/charts/ChartContainer'
import VerticalBarChart from '../charts/VerticalBarChart'

// try id variants with both `-` and `_`
// TODO: normalize data to make this less hacky
const getBlockData = (data, id) => {
    const stats = data.stats && (data.stats[id] || data.stats[id.replace(/-/g, '_')])
    const yearData = stats && stats.find(d => d.survey === '2018')
    return yearData && yearData.ranges
}

const VerticalBarBlock = ({ block, data }) => {
    const blockKeys = keys[block.id]
    const blockData = getBlockData(data, block.id)

    if (!blockData) {
        return <div>VerticalBarBlock: Missing data for block {block.id}</div>
    }
    if (!blockKeys) {
        return <div>VerticalBarBlock: Missing keys for block {block.id}</div>
    }
    return (
        <Block id={block.id} showDescription={false}>
            <ChartContainer>
                <VerticalBarChart data={blockData} keys={blockKeys} i18nNamespace={block.id} />
            </ChartContainer>
        </Block>
    )
}

export default VerticalBarBlock
