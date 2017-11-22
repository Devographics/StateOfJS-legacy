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
            <div className="Section">
                <div>
                    <div>
                        <h4 className="SubSectionTitle">Compared to available options</h4>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Legends
                                style={{
                                    marginTop: 0,
                                }}
                                itemStyle={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                legends={[
                                    {
                                        label: 'base options',
                                        color: colorRange[3],
                                    },
                                    {
                                        label: 'others',
                                        color: colorRange[0],
                                    },
                                ]}
                            />
                        </div>
                        <div className="chart-wrapper" style={{ height: 600 }}>
                            <OthersBubble data={bubbleData} baseKeys={baseKeys} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
