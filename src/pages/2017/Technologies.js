import React, { Component } from 'react'
import AffinitySankey from '../../components/charts/AffinitySankey'
import AffinityChord from '../../components/charts/AffinityChord'
import AffinityToggle from '../../components/charts/AffinityToggle'
import Filters from '../../components/Filters'
import frontendData from '../../data/frontend.json'

const dataByType = {
    'state management': {
        sankeyData: frontendData.stateSankey,
        chordKeys: frontendData.stateChord.keys,
        chordMatrix: frontendData.stateChord.matrix,
    },
    'javascript flavor': {
        sankeyData: frontendData.flavorSankey,
        chordKeys: frontendData.flavorChord.keys,
        chordMatrix: frontendData.flavorChord.matrix,
    },
}

export default class FrontendAffinity extends Component {
    state = {
        type: 'state management',
    }

    setType = type => {
        this.setState({ type })
    }

    render() {
        const { type } = this.state
        const { sankeyData, chordKeys, chordMatrix } = dataByType[type]

        return (
            <div className="Section">
                <AffinityToggle />
                <AffinityChord keys={chordKeys} matrix={chordMatrix} />
            </div>
        )
    }
}
