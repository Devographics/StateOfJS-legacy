import React from 'react'
import backendData from '../../../data/backend.json'
import ResultsTemplate from '../../../components/templates/ResultsTemplate'
import * as dto from '../../../dto'

const experienceData = dto.experience(backendData.experience)
const numberOfToolsData = dto.experience(backendData.numberOfToolsUsed)

const Results = () => (
    <ResultsTemplate
        section="Back-end"
        description={`
Let's face facts: unlike other categories, there are
very few true contenders here apart from *Express*. Although *Meteor* did 
manage to generate a lot of awareness over the years, it sadly seems like it 
wasn't quite able to capitalize on it. 
`}
        keys={backendData.keys}
        experienceData={experienceData}
        numberOfToolsData={numberOfToolsData}
        happiness={backendData.happiness}
        sponsor="reactforbeginners"
    />
)

export default Results
