import React, { Component } from 'react'
import AffinitySankey from '../../components/charts/AffinitySankey'
import AffinityChord from '../../components/charts/AffinityChord'
import AffinityToggle from '../../components/charts/AffinityToggle'
import Filters from '../../components/elements/Filters'
import frontendData from '../../data/frontend.json'
import addParagraphs from '../../helpers/paragraphs'
import parseBold from '../../helpers/bold'

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

const text = `
How many *React* users also use *Redux*? Do *GraphQL* fans prefer *Webpack*? 
Are *Express* developers also into *Ember*?

This diagram lets you toggle categories on and off to explore the connections
between the inhabitants of the vast JavaScript ecosystem.
`
export default class Connections extends Component {
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
                <div className="block block--text" dangerouslySetInnerHTML={{__html: parseBold(addParagraphs(text))}}/>
                <AffinityToggle />
                <AffinityChord keys={chordKeys} matrix={chordMatrix} />
            </div>
        )
    }
}
