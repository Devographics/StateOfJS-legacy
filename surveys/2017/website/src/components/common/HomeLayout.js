import React from 'react'
import PropTypes from 'prop-types'

const HomeLayout = ({ children }) => <div className="home-layout">{children}</div>

HomeLayout.propTypes = {
    children: PropTypes.any.isRequired
}

export default HomeLayout
