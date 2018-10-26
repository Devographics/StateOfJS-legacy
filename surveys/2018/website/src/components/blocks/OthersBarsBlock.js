import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OthersBar from '../charts/OthersBar'
import Libraries from '../elements/Libraries'
import reverse from 'lodash/reverse'
import BlockTitle from '../elements/BlockTitle'

export default class OthersBarsBlock extends Component {
    state = {
        mode: 'compare'
    }

    static propTypes = {
        title: PropTypes.string,
        baseKeys: PropTypes.array.isRequired,
        others: PropTypes.array.isRequired,
    }

    render() {
        const { baseKeys, others: _others } = this.props

        const others = _others.filter(({ key }) => !baseKeys.includes(key))
        const reversedOthers = reverse(others)

        return (
            <div className="block block--chart block--othersbar">
                <BlockTitle chart="other-tools" />

                <div className="block__description">
                    <p>Other tools mentioned by survey respondents, ranked by mention count.</p>
                </div>
                <div className="capture others-wrapper">
                    <Libraries data={reversedOthers} variant="vertical" />
                    <div className="chart-wrapper" style={{ height: 800 }}>
                        <OthersBar data={reversedOthers} />
                    </div>
                </div>
            </div>
        )
    }
}
