import React from 'react'
import testingData from '../../../data/testing.json'
import ResultsTemplate from '../../../components/templates/ResultsTemplate'
import * as dto from '../../../dto'

const data = dto.experience(testingData.experience)

const Results = () =>
    <ResultsTemplate
        data={data}
        description={
            `
Like the rest of Javascript world, the testing landscape is highly competitive
one, with rapid release cycles, feature and performance comparisons, and
constant one-upsmanship between the frameworks.
            `
        }
        section="testing"
        sponsor="reactforbeginners"
    />

export default Results

