import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { colorRange } from '../../constants'
import Filters from '../elements/Filters'
import Legends from '../elements/Legends'
import OthersBubble from '../charts/OthersBubble'
import Libraries from '../elements/Libraries'
import reverse from 'lodash/reverse'

export default class OthersBubbleBlock extends Component {
    state = {
        mode: 'compare',
    }

    static propTypes = {
        title: PropTypes.string,
        base: PropTypes.array.isRequired,
        baseKeys: PropTypes.array.isRequired,
        others: PropTypes.array.isRequired,
    }

    setMode = mode => {
        this.setState({ mode })
    }

    render() {
        const { title, base, baseKeys, others: _others } = this.props
        const { mode } = this.state

        const others = _others.filter(({ key }) => !baseKeys.includes(key))

        let bubbleData
        if (mode === 'compare') {
            bubbleData = [...base, ...others]
        } else {
            bubbleData = others
        }

        return (
            <div className="block block--chart block--othersbubble">
                <h3 className="block__title">All Libraries</h3>
                <div className="block__description">
                    <p>
                        Main libraries usage (defined as number of
                        “have used before and would use again” answers) compared to "Other" answers.
                    </p>
                </div>
                <div className="chart-wrapper" style={{ height: 600 }}>
                    <OthersBubble data={bubbleData} baseKeys={baseKeys} />
                </div>
            </div>
        )
    }
}
