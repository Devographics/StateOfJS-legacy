import React from 'react'
import PropTypes from 'prop-types'

const Debug = ({ title, data }) => (
    <div style={{ marginBottom: 20 }}>
        <div>[debug] {title}</div>
        <div style={{ fontSize: '12px' }}>
            {Object.keys(data).map(key => {
                let value = data[key]
                if (value !== undefined && value.indexOf('http') === 0) {
                    value = <a href={value}>{value}</a>
                }
                return (
                    <div key={key}>
                        {key}: {value === undefined ? <i>undefined</i> : <strong>{value}</strong>}
                    </div>
                )
            })}
        </div>
    </div>
)

Debug.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
}

export default Debug
