import React from 'react'
import getWording from '../../helpers/getWording'
import ShareChart from '../common/ShareChart'

const BlockTitle = ({ chart, tool }) => (
    <div className="block__title">
        <h3 className="block__title__text">{getWording('charts', chart, { tool })}</h3>
        <ShareChart className="block__title__share" chart={chart} />
    </div>
)

export default BlockTitle
