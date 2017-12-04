import React from 'react'

const Fact = props => {
    const { line } = props

    return <div>{line}</div>
}

Fact.propTypes = {
    line: React.PropTypes.string,
}

export default Fact
