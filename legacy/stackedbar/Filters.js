import React from 'react'
import _, { values } from 'lodash'
// import DocumentTitle from 'react-document-title'

const Filters = ({ filters, handleSelect, handleToggle }) => (
    <div className="filters">
        <div className="filter">
            <div className="filter-heading">Filter:</div>
            <ul className="filter-options">
                {values(filters).map(filter => (
                    <li
                        key={filter}
                        className={filter.toLowerCase()}
                        onClick={e => {
                            e.preventDefault()
                            handleSelect(filter)
                        }}
                    >
                        {filter}
                    </li>
                ))}
            </ul>
        </div>
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
    filters: React.PropTypes.object,
    handleSelect: React.PropTypes.func,
}

export default Filters
