import React from 'react'
import { scaleLinear } from 'd3-scale'
import Legends from '../elements/Legends'
import AllToolsBubble from '../charts/AllToolsBubble'
import allTools from '../../data/allToolsUsage.json'
import getWording from '../../helpers/getWording'

const domain = [0, 25, 50, 75, 100]

const colorScale = scaleLinear()
    .domain(domain)
    .range(['#dedfec', '#b3b5e6', '#8b8de8', '#9063e8', '#b741d3'])

const legends = domain.map(key => ({
    label: `${key}%`,
    color: colorScale(key)
}))

const JavascriptLandscapeBlock = () => (
    <div className="block block--chart">
        <h3 className="block__title">2018 Javascript Landscape</h3>
        <div className="block__description">
            <p>Which tools are used with the most satisfaction?</p>
        </div>
        <div className="block__contents">
            <div className="block__contents__inner">
                <Legends legends={legends} modifier="horizontal" />
                <AllToolsBubble data={allTools.allToolsUsage} colorScale={colorScale} />
            </div>
        </div>
    </div>
)

export default JavascriptLandscapeBlock
