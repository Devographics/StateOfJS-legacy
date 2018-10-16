import React from 'react'
import QuadrantChart from '../charts/QuadrantChart'
import BlockTitle from '../elements/BlockTitle'

const legend = [
    ['Assess', 'Low usage but high satisfaction. Technologies worth keeping an eye on.'],
    ['Adopt', 'High usage and high satisfaction. Safe technologies to adopt.'],
    [
        'Analyze',
        `High usage but low satisfaction. Reassess these technologies if you're currently using them.`
    ],
    ['Avoid', `Low usage and low satisfaction. Technologies probably best avoided currently.`]
]

const QuadrantBlock = () => (
    <div className="block block--chart block--happiness">
        <BlockTitle chart="quadrant" />
        <div className="block__content block__content--radar">
            <div className="block__chart block__chart--radar">
                <QuadrantChart />
            </div>
            <div className="block__description block__description--radar">
                <p>
                    This chart shows each technology&apos;s <strong>satisfaction ratio</strong> over
                    its <strong>total usage</strong>.
                </p>
                <p>
                    Additionally, each dot shows the technology&apos;s{' '}
                    <strong>interest ratio</strong> (percentage of non-users interested in learning
                    it).
                </p>
            </div>
        </div>
        <div className="radar__chart__quadrants">
            <h3 className="radar__chart__quadrants__title">Four Quadrants</h3>
            <div className="radar__chart__quadrants__items">
                {legend.map(([label, description]) => (
                    <div className="radar__chart__quadrants__item" key={label}>
                        <strong>{label}</strong>: {description}
                    </div>
                ))}
            </div>
        </div>
    </div>
)

export default QuadrantBlock
