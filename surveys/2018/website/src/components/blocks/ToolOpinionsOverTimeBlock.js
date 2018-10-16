import React from 'react'
import ToolOpinionsOverTimeChart from '../charts/ToolOpinionsOverTimeChart'
import getWording from '../../helpers/getWording'

const ToolOpinionsOverTimeBlock = ({ opinions, tool }) => (
    <div className="block">
        <h3 className="block__title">{getWording('charts', 'results-over-time', { tool })}</h3>
        <ToolOpinionsOverTimeChart opinions={opinions.by_survey} />
    </div>
)

export default ToolOpinionsOverTimeBlock
