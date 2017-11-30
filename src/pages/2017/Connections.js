import React, { Component } from 'react'
import AffinityChord from '../../components/charts/AffinityChord'
import AffinityToggle from '../../components/charts/AffinityToggle'
import allToolsPairing from '../../data/allToolsPairing.json'
import addParagraphs from '../../helpers/paragraphs'
import parseBold from '../../helpers/bold'

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

        return (
            <div className="Section">
                <div
                    className="block block--text"
                    dangerouslySetInnerHTML={{ __html: parseBold(addParagraphs(text)) }}
                />
                <div className="block block--chart block--connections">
                    <AffinityToggle />
                    <AffinityChord
                        keys={allToolsPairing.chord.keys}
                        matrix={allToolsPairing.chord.matrix}
                    />
                </div>
            </div>
        )
    }
}
