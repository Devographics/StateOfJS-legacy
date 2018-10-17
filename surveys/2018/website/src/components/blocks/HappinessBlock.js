import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import HappinessChart from '../charts/HappinessChart'
import BlockTitle from '../elements/BlockTitle'
import withPageData from '../../helpers/withPageData'

class HappinessBlock extends PureComponent {
    static propTypes = {
        section: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired
    }

    render() {
        const { currentPage, value } = this.props

        return (
            <div className="block block--chart block--happiness">
                <BlockTitle chart="happiness" />
                <div className="block__description">
                    <p>
                        On a scale of one to five, how happy are developers with the current state
                        of {currentPage.section.label} tools?
                    </p>
                </div>
                <div>
                    <HappinessChart score={value} />
                </div>
            </div>
        )
    }
}

export default withPageData(HappinessBlock)
