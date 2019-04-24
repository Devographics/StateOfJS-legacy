import React from 'react'
import ToolOverviewChart from '../charts/ToolOverviewChart'
import Block from 'core/components/Block'

const ToolOverviewBlock = () => {
    return (
        <Block id="overview" showDescription={false}>
            <ToolOverviewChart />
        </Block>
    )
}

export default ToolOverviewBlock
