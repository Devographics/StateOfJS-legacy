import React from 'react'
import Block from 'core/blocks/Block'
import TransText from 'core/i18n/TransText'
import QuadrantChart from '../charts/QuadrantChart'

const facets = ['assess', 'adopt', 'avoid', 'analyze']

const QuadrantLegend = () => (
    <div className="Quadrants__Chart__Legend">
        <div className="Quadrants__Chart__Legend__Items">
            {facets.map(facet => (
                <div className="Quadrants__Chart__Legend__Item" key={facet}>
                    <strong>
                        <TransText id={`quadrant.${facet}.label`} />
                    </strong>
                    : <TransText id={`quadrant.${facet}.description`} />
                </div>
            ))}
        </div>
    </div>
)

const QuadrantBlock = ({ tools, chartId, values }) => (
    <Block id={chartId} values={values} className="Quadrants__Block block--chart block--quadrant">
        <div className="Quadrants__Block__Content block__content block__content--quadrant">
            <div className="Quadrants__Block__Chart block__chart block__chart--quadrant">
                <QuadrantChart tools={tools} />
            </div>
            <QuadrantLegend />
        </div>
    </Block>
)

export default QuadrantBlock
