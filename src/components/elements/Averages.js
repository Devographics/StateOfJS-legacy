import React from 'react'
import paddingFormula from '../../helpers/paddingFormula'
import classNames from 'classnames'
// <div className="salariesaverage__label">Average Salary</div>

const Averages = ({ data }) => (
    <div className={`averages averages--${data.length}-items`}>
        <div className="averages__legend">
            <span>Average:</span>
        </div>
        <div className="averages__inner" style={{ padding: paddingFormula(data.length) }}>
            {data.map(({ tool, value }, index) => (
                <div
                    className={classNames('averages__item', {
                        'averages__item--aggregated': tool === 'Aggregated',
                    })}
                    key={index}
                >
                    <span className="averages__item__inner">{value}</span>
                </div>
            ))}
        </div>
    </div>
)

export default Averages
