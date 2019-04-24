import React from 'react'
import Block from 'core/components/Block'
import ToolOpinionsOverTimeChart from '../charts/ToolOpinionsOverTimeChart'

const ToolOpinionsOverTimeBlock = ({ opinions, chartId }) => (
    <Block id={chartId} showDescription={false}>
        <ToolOpinionsOverTimeChart opinions={opinions.by_survey} />
    </Block>
)

export default ToolOpinionsOverTimeBlock
