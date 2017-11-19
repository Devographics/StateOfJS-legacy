import React from 'react'
import PropTypes from 'prop-types'

const Filters = ({ filters, filter: currentFilter, onChange, className }) => (
    <div className={`Filters${className ? ` ${className}` : ''}`}>
        {filters.map(filter => (
            <span
                key={filter}
                className={`noSelect Filters__item${
                    filter === currentFilter ? ' Filters__item--active' : ''
                }`}
                onClick={() => {
                    onChange(filter)
                }}
            >
                {filter}
            </span>
        ))}
    </div>
)

Filters.propTypes = {
    filters: PropTypes.array.isRequired,
    filter: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

export default Filters
