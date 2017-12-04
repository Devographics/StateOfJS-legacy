import React from 'react'

import happiness from '../../data/happiness.yaml'

const HappinessChart = ({ score = 3.75 }) => 
    <div className="happiness__wrapper">
        <div className="happiness">
            <div className="happiness__levels">  
                {happiness.map((label, index) => 
                    <div className="happiness__item">
                        <div className="happiness__item__inner">
                            <span className="happiness__item__index">{index+1}</span>
                            <span className="happiness__item__label">{label}</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="happiness__meter" style={{width: `${(score-1)*25}%`}}>
                <div className="happiness__target">{score}</div>
            </div>
        </div>
    </div>

export default HappinessChart
