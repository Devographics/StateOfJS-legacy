import React, { Component } from 'react'
import PropTypes from 'prop-types'
import truncate from 'lodash/truncate'
import { ResponsiveChord as Chord } from 'nivo'
import { colorScale } from '../../constants'
import theme from '../../nivoTheme'

export default class AffinityChord extends Component {
    static propTypes = {
        keys: PropTypes.arrayOf(PropTypes.string).isRequired,
        matrix: PropTypes.arrayOf(PropTypes.array).isRequired,
    }

    render() {
        const { keys, matrix } = this.props

        return (
            <div className="chart-wrapper">
                <Chord
                    margin={{
                        top: 80,
                        right: 80,
                        bottom: 80,
                        left: 80,
                    }}
                    colors={colorScale}
                    padAngle={0.02}
                    innerRadiusOffset={0.02}
                    keys={keys}
                    matrix={matrix}
                    labelRotation={-90}
                    ribbonHoverOthersOpacity={0}
                    label={d => truncate(d.id, { length: 10 })}
                    animate={false}
                    theme={theme}
                />
            </div>
        )
    }
}
