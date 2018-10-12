import React from 'react'
import PropTypes from 'prop-types'
import RadarChart from '../charts/RadarChart'

const legend = [
    [
        'Assess',
        'Low usage but high satisfaction. Technologies worth keeping an eye on.'
    ],
    [
        'Adopt',
        'High usage and high satisfaction. Safe technologies to adopt.'
    ],
    [
        'Analyze',
        `High usage but low satisfaction. Reassess these technologies if you're currently using them.`
    ],
    [
        'Avoid',
        `Low usage and low satisfaction. Technologies probably best avoided for now.`
    ]
]

const RadarBlock = () => (
    <div className="block block--chart block--happiness">
        <h3 className="block__title">Radar Chart</h3>
        <div className="block__content block__content--radar">
            <div className="block__chart block__chart--radar">
                <RadarChart />
            </div>
            <div className="block__description block__description--radar">
                <p>
                    This chart shows each technology's <strong>satisfaction ratio</strong> over its{' '}
                    <strong>total usage</strong>. 
                </p>

                <p>
                    Additionally, larger dots mean a higher{' '}
                    <strong>interest ratio</strong> (developers not yet using a technology but
                    interested in learning it).
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

// RadarBlock.propTypes = {
//     score: PropTypes.number.isRequired
// }

export default RadarBlock
