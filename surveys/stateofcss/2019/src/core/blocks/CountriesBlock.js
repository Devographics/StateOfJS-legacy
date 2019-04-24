import React from 'react'
import Block from 'core/components/Block'
import ChartContainer from 'core/charts/ChartContainer'
import CountriesChart from 'core/charts/CountriesChart'

const CountriesBlock = ({ block, data }) => {
    return (
        <Block id={block.id} showDescription={false}>
            <ChartContainer>
                <CountriesChart data={data} />
            </ChartContainer>
        </Block>
    )
}

export default CountriesBlock
