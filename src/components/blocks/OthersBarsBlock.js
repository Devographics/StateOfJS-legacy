import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { colorRange } from '../../constants'
import Filters from '../elements/Filters'
import Legends from '../elements/Legends'
import OthersBar from '../charts/OthersBar'
import Libraries from '../elements/Libraries'
import reverse from 'lodash/reverse'

export default class OthersBarsBlock extends Component {
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
            <div className="Section">
                <h3 className="SectionTitle">
                    <span>{title}</span>
                </h3>
                <div>
                    <div className="capture">
                        <h4 className="SubSectionTitle">Top mentions</h4>
                        <div className="others-wrapper">
                            <Libraries data={reverse([...others])} variant="vertical"/>
                            <div className="chart-wrapper" style={{ height: 800 }}>
                                <OthersBar data={others} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
