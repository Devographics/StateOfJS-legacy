import React from 'react'
import ToolOpinionsOverTimeChart from '../charts/ToolOpinionsOverTimeChart'
import BlockTitle from '../elements/BlockTitle'

const ToolOpinionsOverTimeBlock = ({ opinions, tool }) => (
    <div className="block">
        <BlockTitle chart="results-over-time" tool={tool}/>
        <ToolOpinionsOverTimeChart opinions={opinions.by_survey} />
    </div>
)

export default ToolOpinionsOverTimeBlock
