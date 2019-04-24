import React, { useContext } from 'react'
import Block from 'core/components/Block'
import { I18nContext } from 'core/i18n/i18nContext'
import QuadrantChart from '../charts/QuadrantChart'

const facets = ['assess', 'adopt', 'avoid', 'analyze']

const QuadrantLegend = () => {
    const { translate } = useContext(I18nContext)

    return (
        <div className="Quadrants__Chart__Legend">
            <div className="Quadrants__Chart__Legend__Items">
                {facets.map(facet => (
                    <div className="Quadrants__Chart__Legend__Item" key={facet}>
                        <strong>{translate(`quadrant.${facet}.label`)}</strong>:{' '}
                        {translate(`quadrant.${facet}.description`)}
                    </div>
                ))}
            </div>
        </div>
    )
}

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
