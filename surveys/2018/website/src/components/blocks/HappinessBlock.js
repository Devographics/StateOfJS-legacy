import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import HappinessTrendChart from '../charts/HappinessTrendChart'
import BlockTitle from '../elements/BlockTitle'
import withPageData from '../../helpers/withPageData'
import { getWording } from '../../helpers/wording'

const chartId = 'happiness'

class HappinessBlock extends PureComponent {
    static propTypes = {
        section: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                survey: PropTypes.string.isRequired,
                average: PropTypes.number.isRequired,
                scores: PropTypes.arrayOf(
                    PropTypes.shape({
                        score: PropTypes.number.isRequired,
                        count: PropTypes.number.isRequired,
                        percentage: PropTypes.number.isRequired
                    })
                ).isRequired
            })
        ).isRequired
    }

    render() {
        const { currentPage, data, sectionName } = this.props

        return (
            <div className="Block Block--happiness Happiness__Block" id={chartId}>
                <BlockTitle chartId={chartId} values={{ sectionName }}/>
                <div className="block__description">
                    <p>
                        {getWording('block_intro.happiness', {
                            section: currentPage.section.label
                        })}
                    </p>
                </div>
                <HappinessTrendChart data={data} />
            </div>
        )
    }
}

export default withPageData(HappinessBlock)
