import React, { Component } from 'react'
import AffinitySankey from '../../../components/charts/AffinitySankey'
import AffinityChord from '../../../components/charts/AffinityChord'
import Filters from '../../../components/Filters'
import buildData from '../../../data/build.json'

const dataByType = {
    'front-end frameworks': {
        sankeyData: buildData.frontendSankey,
        chordKeys: buildData.frontendChord.keys,
        chordMatrix: buildData.frontendChord.matrix,
    },
}

export default class BuildAffinity extends Component {
    state = {
        type: 'front-end frameworks',
    }

    setType = type => {
        this.setState({ type })
    }

    render() {
        const { type } = this.state
        const { sankeyData, chordKeys, chordMatrix } = dataByType[type]

        return (
            <div className="Section">
                <h3 className="SectionTitle">
                    <span>Build tools affinity</span>
                </h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Filters
                        filters={Object.keys(dataByType)}
                        filter={type}
                        onChange={this.setType}
                    />
                </div>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '50%' }}>
                        <AffinitySankey data={sankeyData} sourceKeys={buildData.keys} />
                    </div>
                    <div style={{ width: '50%' }}>
                        <AffinityChord keys={chordKeys} matrix={chordMatrix} />
                    </div>
                </div>
            </div>
        )
    }
}
