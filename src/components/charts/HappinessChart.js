import React from 'react'
import PropTypes from 'prop-types'
import happiness from '../../data/happiness.yaml'

const HappinessChart = ({ score }) => (
    <div className="happiness__wrapper">
        <div className="happiness">
            <div className="happiness__levels">
                {happiness.map((label, index) => (
                    <div className="happiness__item" key={index}>
                        <div className="happiness__item__inner">
                            <span className="happiness__item__index">{index + 1}</span>
                            {(index === 0 || index === 4) && <span className="happiness__item__label">{label}</span>}
                        </div>
                    </div>
                ))}
            </div>
            <div className="happiness__meter" style={{ width: `${(score - 1) * 25}%` }}>
                <div className="happiness__target">
                    <h4>{score}</h4>
                </div>
            </div>
        </div>
    </div>
)

HappinessChart.propTypes = {
    score: PropTypes.number.isRequired,
}

export default HappinessChart
