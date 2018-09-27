import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import paddingFormula from '../../helpers/paddingFormula'

const Averages = ({ data }) => (
    <div className={`averages averages--${data.length}-items`}>
        <div className="averages__legend">
            <span>Average:</span>
        </div>
        <div className="averages__inner" style={{ padding: paddingFormula(data.length) }}>
            {data.map(({ tool, value }, index) => (
                <div
                    className={classNames('averages__item', {
                        'averages__item--aggregated': tool === 'Aggregated'
                    })}
                    key={index}
                >
                    <span className="averages__item__inner">{value}</span>
                </div>
            ))}
        </div>
    </div>
)

Averages.propTypes = {
    data: PropTypes.array.isRequired
}

export default Averages
