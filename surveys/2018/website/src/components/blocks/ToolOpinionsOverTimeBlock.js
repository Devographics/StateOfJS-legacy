import React from 'react'
import ToolOpinionsOverTimeChart from '../charts/ToolOpinionsOverTimeChart'
import BlockTitle from '../elements/BlockTitle'

const ToolOpinionsOverTimeBlock = ({ opinions, tool, projects }) => (
    <div className="block" id="results-over-time">
        <BlockTitle chart="results-over-time" tool={tool} projects={projects} />
        <ToolOpinionsOverTimeChart opinions={opinions.by_survey} />
    </div>
)

export default ToolOpinionsOverTimeBlock
