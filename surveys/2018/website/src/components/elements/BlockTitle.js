import React from 'react'
import { getWording, getToolName } from '../../helpers/wording'
import ShareChart from '../common/ShareChart'

const BlockTitle = ({ chart, tool }) => (
    <div className="block__title">
        <h3 className="block__title__text">
            {getWording(`charts.${chart}`, { tool: getToolName(tool) })}
        </h3>
        <ShareChart className="block__title__share" chart={chart} />
    </div>
)

export default BlockTitle
