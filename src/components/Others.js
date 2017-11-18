import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { colorRange } from '../constants'
import Filters from './Filters'
import Legends from './Legends'
import OthersBar from './charts/OthersBar'
import OthersBubble from './charts/OthersBubble'

export default class Others extends Component {
    state = {
        mode: 'compare',
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
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
                    <div>
                        <h4 className="SubSectionTitle">Top mentions</h4>
                        <div className="chart-wrapper" style={{ height: 800 }}>
                            <OthersBar data={others} />
                        </div>
                    </div>
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
