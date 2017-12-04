import React from 'react'
import PropTypes from 'prop-types'

const Filters = ({ handleToggle }) => (
    <div className="filters">
        <div className="filter">
            <div className="filter-heading">Show:</div>
            <ul className="filter-options">
                <li
                    className="percent"
                    onClick={e => {
                        e.preventDefault()
                        handleToggle('percent')
                    }}
                >
                    Percents
                </li>
                <li
                    className="numbers"
                    onClick={e => {
                        e.preventDefault()
                        handleToggle('numbers')
                    }}
                >
                    Numbers
                </li>
            </ul>
        </div>
    </div>
)

Filters.propTypes = {
    handleToggle: PropTypes.func,
}

export default Filters
