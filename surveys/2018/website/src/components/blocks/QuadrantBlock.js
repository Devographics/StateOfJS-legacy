import React from 'react'
import { getWording } from '../../helpers/wording'
import QuadrantChart from '../charts/QuadrantChart'
import BlockTitle from '../elements/BlockTitle'

const facets = ['assess', 'adopt', 'avoid', 'analyze']

const QuadrantLegend = () => (
    <div className="Quadrants__Chart__Legend">
        <div className="Quadrants__Chart__Legend__Items">
            {facets.map(facet => (
                <div className="Quadrants__Chart__Legend__Item" key={facet}>
                    <strong>{getWording(`quadrant.${facet}.label`)}</strong>:{' '}
                    {getWording(`quadrant.${facet}.description`)}
                </div>
            ))}
        </div>
    </div>
)

const QuadrantBlock = ({ tools, chartId, values }) => (
    <div className="Quadrants__Block block block--chart block--quadrant" id={chartId}>
        <BlockTitle chartId={chartId} values={values} />
        <div className="Quadrants__Block__Content block__content block__content--quadrant">
            <div className="Quadrants__Block__Chart block__chart block__chart--quadrant">
                <QuadrantChart tools={tools} />
            </div>
            <QuadrantLegend />
        </div>
    </div>
)

export default QuadrantBlock
