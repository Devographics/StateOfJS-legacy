import React from 'react'
import QuadrantChart from '../charts/QuadrantChart'
import BlockTitle from '../elements/BlockTitle'

const legend = [
    ['Assess', 'Low usage but high satisfaction. Technologies worth keeping an eye on.'],
    ['Adopt', 'High usage and high satisfaction. Safe technologies to adopt.'],
    ['Avoid', `Low usage and low satisfaction. Technologies probably best avoided currently.`],
    [
        'Analyze',
        `High usage but low satisfaction. Reassess these technologies if you're currently using them.`
    ]
]

const QuadrantLegend = () => (
    <div className="Quadrants__Chart__Legend">
        <h3 className="Quadrants__Chart__Legend__Title">Four Quadrants</h3>
        <div className="Quadrants__Chart__Legend__Items">
            {legend.map(([label, description]) => (
                <div className="Quadrants__Chart__Legend__Item" key={label}>
                    <strong>{label}</strong>: {description}
                </div>
            ))}
        </div>
    </div>
)

const QuadrantBlock = ({ tools }) => (
    <div className="Quadrants__Block block block--chart block--quadrant">
        <BlockTitle chart="quadrant" />
        <div className="Quadrants__Block__Description block__description block__description--quadrant">
            <p>
                This chart shows each technology&apos;s <strong>satisfaction ratio</strong> over its{' '}
                <strong>total usage</strong>.
            </p>
            <p>
Additionally, technologies that have an <strong>interest ratio</strong>{' '}
                (percentage of non-users interested in learning it) over 50% are displayed as “on fire”.
            </p>
        </div>
        <div className="Quadrants__Block__Content block__content block__content--quadrant">
            <div className="Quadrants__Block__Chart block__chart block__chart--quadrant">
                <QuadrantChart tools={tools} />
            </div>
            <QuadrantLegend />
        </div>
    </div>
)

export default QuadrantBlock
