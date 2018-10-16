import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OthersBubble from '../charts/OthersBubble'
import getWording from '../../helpers/getWording'

export default class OthersBubbleBlock extends Component {
    static propTypes = {
        base: PropTypes.array.isRequired,
        baseKeys: PropTypes.array.isRequired,
        others: PropTypes.array.isRequired
    }

    render() {
        const { base, baseKeys, others: _others } = this.props

        const others = _others.filter(({ key }) => !baseKeys.includes(key))
        const bubbleData = [...base, ...others].filter(({ key }) => key !== 'Aggregated')

        return (
            <div className="block block--chart block--othersbubble">
                <h3 className="block__title">All Libraries</h3>
                <div className="block__description">
                    <p>
                        Main libraries usage (defined as number of “have used before and would use
                        again” answers) compared to &quot;Other&quot; answers.
                    </p>
                </div>
                <div className="chart-wrapper">
                    <OthersBubble data={bubbleData} baseKeys={baseKeys} />
                </div>
            </div>
        )
    }
}
