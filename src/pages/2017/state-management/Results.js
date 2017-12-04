import React from 'react'
import stateData from '../../../data/state.json'
import ResultsTemplate from '../../../components/templates/ResultsTemplate'
import * as dto from '../../../dto'

const experienceData = dto.experience(stateData.experience)
const numberOfToolsData = dto.experience(stateData.numberOfToolsUsed)

const Results = () => (
    <ResultsTemplate
        section="State Management"
        description={`
State Management regroups all solutions used to manage data, both on client and server.

On the client *Redux* is still the uncontested leader, but the rise of *GraphQL* might end up shaking
things up: the huge wave of interest it's generating might help push libraries like *Relay Modern* and *Apollo*
in the near future. 
            `}
        keys={stateData.keys}
        experienceData={experienceData}
        numberOfToolsData={numberOfToolsData}
        happiness={stateData.happiness}
        sponsor="reactforbeginners"
    />
)

export default Results
