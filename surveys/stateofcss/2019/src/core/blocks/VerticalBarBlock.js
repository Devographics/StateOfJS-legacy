import React from 'react'
import { keys } from '../../constants'
import Block from 'core/blocks/Block'
import ChartContainer from 'core/charts/ChartContainer'
import VerticalBarChart from '../charts/VerticalBarChart'

const VerticalBarBlock = ({ block, data }) => {
    const blockKeys = keys[block.id]
    if (!data) {
        return <div>Missing data for block {block.id}</div>
    }
    if (!blockKeys) {
        return <div>Missing keys for block {block.id}</div>
    }
    return (
        <Block id={block.id} showDescription={false}>
            <ChartContainer>
                <VerticalBarChart data={data.ranges} keys={blockKeys} i18nNamespace={block.id} />
            </ChartContainer>
        </Block>
    )
}

export default VerticalBarBlock
