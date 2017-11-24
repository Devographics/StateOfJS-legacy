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
Like the rest of Javascript world, the testing landscape is a highly competitive
one, with rapid release cycles, feature and performance comparisons, and
constant one-upsmanship between the frameworks. 

Altough the fight is far from settled, *Jest* and *Enzyme* do stand out from the pack with very high satisfaction ratings.  
`
        }
        section="Testing"
        sponsor="reactforbeginners"
    />

export default Results

