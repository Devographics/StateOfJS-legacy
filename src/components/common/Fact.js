import React from 'react'
import PropTypes from 'prop-types'

const Fact = props => {
    const { line } = props

    return <div>{line}</div>
}

Fact.propTypes = {
    line: PropTypes.string,
}

export default Fact
