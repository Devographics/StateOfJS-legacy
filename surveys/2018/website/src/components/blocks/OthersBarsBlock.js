import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OthersBar from '../charts/OthersBar'
import Libraries from '../elements/Libraries'
import reverse from 'lodash/reverse'
import ShareChart from '../common/ShareChart'
import getWording from '../../helpers/getWording'

export default class OthersBarsBlock extends Component {
    state = {
        mode: 'compare'
    }

    static propTypes = {
        title: PropTypes.string,
        base: PropTypes.array.isRequired,
        baseKeys: PropTypes.array.isRequired,
        others: PropTypes.array.isRequired,
        section: PropTypes.string.isRequired
    }

    render() {
        const { baseKeys, others: _others, section } = this.props

        const others = _others.filter(({ key }) => !baseKeys.includes(key))

        return (
            <div className="block block--chart block--othersbar">
                <h3 className="block__title">Top Mentions</h3>
                <div className="block__description">
                    <p>Tools mentioned the most in &quot;Other&quot; answer.</p>
                </div>
                <div className="capture others-wrapper">
                    <Libraries data={reverse([...others])} variant="vertical" />
                    <div className="chart-wrapper" style={{ height: 800 }}>
                        <OthersBar data={others} />
                    </div>
                </div>
                <ShareChart section={section} subSection="others" />
            </div>
        )
    }
}
