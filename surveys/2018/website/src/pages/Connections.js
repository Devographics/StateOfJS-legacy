import React, { Component } from 'react'
import AffinityChord from '../components/charts/AffinityChord'
import AffinityToggle from '../components/charts/AffinityToggle'
import allToolsPairing from '../data/allToolsPairing.json'
import keysBySection from '../data/keysBySection'
import addParagraphs from '../helpers/paragraphs'
import parseBold from '../helpers/bold'
import { chordScale } from '../constants'
import flatten from 'lodash/flatten'
import getPageTitle from '../helpers/getPageTitle'
import Layout from '../components/common/Layout'

const {
    chord: { keys, matrix }
} = allToolsPairing

const allSections = [
    { id: 'flavors', label: 'JavaScript Flavors' },
    { id: 'frontend', label: 'Front-End Frameworks' },
    { id: 'state', label: 'State Management Tools' },
    { id: 'backend', label: 'Back-End Frameworks' },
    { id: 'testing', label: 'Testing Tools' },
    { id: 'style', label: 'CSS & Styling' },
    { id: 'build', label: 'Build Tools' },
    { id: 'mobile', label: 'Mobile Frameworks' }
]

const MAX_NUMBER_OF_SECTIONS = 3

const text = `
How many *React* users also use *Redux*? Do *GraphQL* fans prefer *Webpack*? 
Are *Express* developers also into *Ember*?

This diagram lets you toggle categories on and off to explore the connections
between the inhabitants of the vast JavaScript ecosystem. You can select up to 3 categories at a time.

The size of each section corresponds to the number of respondents who have used each library
and would be willing to use it again. 
`
export default class Connections extends Component {
    state = {
        sections: ['frontend', 'flavors']
    }

    handleSectionToggle = section => {
        const { sections } = this.state
        const isAlreadySelected = sections.includes(section)

        let newSections
        if (isAlreadySelected) {
            newSections = sections.filter(s => s !== section)
        } else {
            newSections = [...sections, section]
        }

        this.setState({ sections: newSections })
    }

    render() {
        const { sections } = this.state

        const sectionsKeys = sections.reduce(
            (agg, section) => [...agg, ...keysBySection[section]],
            []
        )

        const keysIndexes = keys
            .map((key, index) => ({ key, index }))
            .filter(({ key }) => sectionsKeys.includes(key))
            .map(({ index }) => index)

        const filteredKeys = keysIndexes.map(index => keys[index])
        const filteredMatrix = matrix
            .filter((row, index) => keysIndexes.includes(index))
            .map(row => {
                return row.filter((item, index) => keysIndexes.includes(index))
            })

        const colors = flatten(
            sections.map((section, i) => {
                return keysBySection[section].map(() => chordScale[i])
            })
        )

        return (
            <Layout title={getPageTitle('Connections')}>
                <div className="Section">
                    <div
                        className="block block--text"
                        dangerouslySetInnerHTML={{ __html: parseBold(addParagraphs(text)) }}
                    />
                    <div className="block block--chart block--connections">
                        <AffinityToggle
                            sections={allSections}
                            selectedSections={sections}
                            onChange={this.handleSectionToggle}
                            maxNumberOfSections={MAX_NUMBER_OF_SECTIONS}
                        />
                        <AffinityChord
                            colors={colors}
                            keys={filteredKeys}
                            matrix={filteredMatrix}
                        />
                    </div>
                </div>
            </Layout>
        )
    }
}
