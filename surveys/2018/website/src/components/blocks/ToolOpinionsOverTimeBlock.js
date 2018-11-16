import React from 'react'
import ToolOpinionsOverTimeChart from '../charts/ToolOpinionsOverTimeChart'
import BlockTitle from '../elements/BlockTitle'
import { getToolName } from '../../helpers/wording'

const ToolOpinionsOverTimeBlock = ({ opinions, tool, chartId }) => (
    <div className="block" id={chartId}>
        <BlockTitle chartId={chartId} values={{ tool: getToolName(tool) }} />
        <ToolOpinionsOverTimeChart opinions={opinions.by_survey} />
    </div>
)

export default ToolOpinionsOverTimeBlock
