import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NumberOfLibrariesBlock extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
    }

    render() {
        return (
            <div className="block block--chart block--numberoflibs">
                <h3 className="block__title">Number of Libraries Used</h3>
                <div className="block__description">
                    <p>How many different libraries have developers used?</p>
                </div>
                <img src="https://d3vv6lp55qjaqc.cloudfront.net/items/3r3H092K1I0B17111t2b/Screen%20Shot%202017-11-23%20at%2014.48.50.png?X-CloudApp-Visitor-Id=f25ee64a8f9b32be400086060540ffac&v=92889c34" />
            </div>
        )
    }
}
