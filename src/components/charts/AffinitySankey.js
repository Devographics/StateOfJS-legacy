import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveSankey } from 'nivo'
import theme from '../../nivoTheme'

export default class AffinitySankey extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        sourceKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    }

    render() {
        const { data, sourceKeys } = this.props

        return (
            <div style={{ height: 600 }}>
                <ResponsiveSankey
                    data={data}
                    margin={{
                        top: 10,
                        right: 140,
                        bottom: 10,
                        left: 140,
                    }}
                    colorBy={d => {
                        if (sourceKeys.includes(d.id)) return 'rgb(150, 136, 228)'
                        return 'rgb(251, 243, 76)'
                    }}
                    linkColorBy={() => 'rgb(180, 173, 220)'}
                    labelPosition="outside"
                    labelTextColor="inherit:darker(0.4)"
                    animate={false}
                    motionStiffness={120}
                    motionDamping={15}
                    theme={theme}
                />
            </div>
        )
    }
}
