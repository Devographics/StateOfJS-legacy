import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import HappinessTrendChart from '../charts/HappinessTrendChart'

const chartId = 'happiness'

export default class HappinessBlock extends PureComponent {
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
        const { data } = this.props

        return (
            <Block id={chartId} className="Block--happiness Happiness__Block">
                <HappinessTrendChart data={data} />
            </Block>
        )
    }
}
