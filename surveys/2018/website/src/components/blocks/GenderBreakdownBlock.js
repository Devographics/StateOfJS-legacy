import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextBlock from './TextBlock'
import GenderLegends from '../elements/GendersLegends'
import { getWording } from '../../helpers/wording'

const introText = `
This map shows the gender people selected distributed by continent.
`

export default class GenderBreakdownBlock extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    }

    render() {
        return (
            <div className="block">
                <h3 className="block__title">{getWording('charts.gender')}</h3>
                <TextBlock text={introText} />
                <GenderLegends />
            </div>
        )
    }
}
