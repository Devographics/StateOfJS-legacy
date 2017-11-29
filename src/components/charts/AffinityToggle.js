import React, { Component } from 'react'
import PropTypes from 'prop-types'
import nav from '../../data/nav.yaml'
import filter from 'lodash/filter'

// const sections = ['flavors', 'frontend', 'state', 'backend', 'testing', 'css', 'build', 'mobile'];

const sections = filter(nav, item => item.subPages)

export default class AffinityToggle extends Component {
    static propTypes = {}

    render() {
        return (
            <div className="Chord--toggle">
                <ul>
                    {sections.map((section, i) => (
                        <li key={i}>
                            <label>
                                <input type="checkbox" />
                                {section.fullLabel}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
