import React, { useContext } from 'react'
import ToolOverviewChart from '../charts/ToolOverviewChart'
import Block from 'core/blocks/Block'

const ToolOverviewBlock = () => {
    return (
        <Block id="overview" showDescription={false}>
            <ToolOverviewChart />
        </Block>
    )
}

export default ToolOverviewBlock
