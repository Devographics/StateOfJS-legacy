import React from 'react'
import ToolOpinionsOverTimeChart from '../charts/ToolOpinionsOverTimeChart'
import BlockTitle from '../elements/BlockTitle'

const chartId = 'results-over-time'

const ToolOpinionsOverTimeBlock = ({ opinions, tool }) => (
    <div className="block" id={chartId}>
        <BlockTitle chartId={chartId} tool={tool} />
        <ToolOpinionsOverTimeChart opinions={opinions.by_survey} />
    </div>
)

export default ToolOpinionsOverTimeBlock
