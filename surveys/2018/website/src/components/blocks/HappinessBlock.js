import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import HappinessChart from '../charts/HappinessChart'
import BlockTitle from '../elements/BlockTitle'
import withPageData from '../../helpers/withPageData'
import { getWording } from '../../helpers/wording'

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
                        {getWording('block_intro.happiness', { section: currentPage.section.label })}
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
