import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import HappinessChart from '../charts/HappinessChart'

export default class HappinessBlock extends PureComponent {
    static propTypes = {
        section: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
    }

    render() {
        const { section, value } = this.props

        return (
            <div className="block block--chart block--happiness">
                <h3 className="block__title">Overall Happiness</h3>
                <div className="block__description">
                    <p>
                        On a scale of one to five, how happy are developers with the current state
                        of {section} tools?
                    </p>
                </div>
                <div>
                    <HappinessChart score={value} />
                </div>
            </div>
        )
    }
}
