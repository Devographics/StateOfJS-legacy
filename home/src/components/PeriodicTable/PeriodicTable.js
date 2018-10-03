import React from 'react'
import PropTypes from 'prop-types'

import Element from './Element'

const PeriodicTable = ({ elements }) => (
    <div className="periodic-table-wrapper">
        <div className="periodic-table">
            {elements.map((element, i) => (
                element.name && <Element {...element} key={i} />
            ))}
            <div className="periodic-gradient" />
        </div>
    </div>
)

PeriodicTable.propTypes = {
    elements: PropTypes.array.isRequired,
}

export default PeriodicTable
