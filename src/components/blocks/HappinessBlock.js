import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import HappinessChart from '../charts/HappinessChart'

export default class HappinessBlock extends PureComponent {
    // static propTypes = {
    //     keys: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    //     data: PropTypes.arrayOf(
    //         PropTypes.shape({
    //             key: PropTypes.number.isRequired,
    //             doc_count: PropTypes.number.isRequired,
    //         })
    //     ).isRequired,
    // }

    render() {

        const { section } = this.props

        return (
            <div className="block block--chart block--happiness">
                <h3 className="block__title">Overall Happiness</h3>
                <div className="block__description">
                    <p>How happy are developers with the current state of {section} tools?</p>
                </div>
                <div><HappinessChart/></div>
            </div>
        )
    }
}
