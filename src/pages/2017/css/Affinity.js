import React, { Component } from 'react'
import AffinitySankey from '../../../components/charts/AffinitySankey'
import AffinityChord from '../../../components/charts/AffinityChord'
import Filters from '../../../components/elements/Filters'
import styleData from '../../../data/style.json'

const dataByType = {
    'front-end frameworks': {
        sankeyData: styleData.frontendSankey,
        chordKeys: styleData.frontendChord.keys,
        chordMatrix: styleData.frontendChord.matrix,
    },
}

export default class StyleAffinity extends Component {
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
                    <span>Styling/CSS solutions tools affinity</span>
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
                        <AffinitySankey data={sankeyData} sourceKeys={styleData.keys} />
                    </div>
                    <div style={{ width: '50%' }}>
                        <AffinityChord keys={chordKeys} matrix={chordMatrix} />
                    </div>
                </div>
            </div>
        )
    }
}
