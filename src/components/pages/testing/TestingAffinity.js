import React, { Component } from 'react'
import AffinitySankey from '../../charts/AffinitySankey'
import AffinityChord from '../../charts/AffinityChord'
import Filters from '../../Filters'
import testingData from '../../../data/testing.json'

const dataByType = {
    'front-end frameworks': {
        sankeyData: testingData.frontendSankey,
        chordKeys: testingData.frontendChord.keys,
        chordMatrix: testingData.frontendChord.matrix,
    },
    'full-stack frameworks': {
        sankeyData: testingData.backendSankey,
        chordKeys: testingData.backendChord.keys,
        chordMatrix: testingData.backendChord.matrix,
    },
}

export default class TestingAffinity extends Component {
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
                    <span>Testing frameworks tools affinity</span>
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
                        <AffinitySankey data={sankeyData} sourceKeys={testingData.keys} />
                    </div>
                    <div style={{ width: '50%' }}>
                        <AffinityChord keys={chordKeys} matrix={chordMatrix} />
                    </div>
                </div>
            </div>
        )
    }
}
