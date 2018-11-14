import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import HappinessChart from '../charts/HappinessChart'
import HappinessTrendChart from '../charts/HappinessTrendChart'
import BlockTitle from '../elements/BlockTitle'
import withPageData from '../../helpers/withPageData'
import { getWording } from '../../helpers/wording'

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
        const { currentPage, data } = this.props
        const surveyData = data.find(d => d.survey === '2018')

        return (
            <div className="block block--chart block--happiness" id="happiness">
                <BlockTitle chart="happiness" />
                <div className="block__description">
                    <p>
                        {getWording('block_intro.happiness', {
                            section: currentPage.section.label
                        })}
                    </p>
                </div>
                {/* <HappinessChart score={surveyData.average} /> */}
                <HappinessTrendChart data={data} />
            </div>
        )
    }
}

export default withPageData(HappinessBlock)
