import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OpinionsLegends from '../elements/OpinionsLegends'
import SectionOpinionsChart from '../charts/SectionOpinionsChart'

export default class SectionOpinionsBlock extends Component {
    static propTypes = {
        section: PropTypes.string.isRequired,
        opinions: PropTypes.arrayOf(
            PropTypes.shape({
                survey_id: PropTypes.string.isRequired
            })
        ).isRequired
    }

    render() {
        return (
            <div className="block">
                <h3 className="block__title">Libraries Results</h3>
                <OpinionsLegends />
                <SectionOpinionsChart section={this.props.section} opinions={this.props.opinions} />
            </div>
        )
    }
}
