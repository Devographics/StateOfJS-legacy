import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SectionOpinionsChart from '../charts/SectionOpinionsChart'
import BlockTitle from '../elements/BlockTitle'

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
                <BlockTitle chart="overview"/>
                <div className="block__description">
                    <p>Per-library survey results.</p>
                </div>
                <SectionOpinionsChart section={this.props.section} opinions={this.props.opinions} />
            </div>
        )
    }
}
