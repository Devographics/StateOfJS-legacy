import React from 'react'
import ResultsTemplate from '../../components/templates/ResultsTemplate'
import frontendData from '../../data/frontend.json'
import * as dto from '../../dto'

const experienceData = dto.experience(frontendData.experience)
const numberOfToolsData = dto.experience(frontendData.numberOfToolsUsed)

const Results = () => (
    <ResultsTemplate
        section="Front-end"
        description={`As always, the battle for JavaScript mindshare is led by front-end frameworks.

*React* is still the dominant player here, but *Vue* is making big gains on the back of
*Angular*'s diminishing popularity. By 2018, this chart might end up looking very different!`}
        keys={frontendData.keys}
        experienceData={experienceData}
        numberOfToolsData={numberOfToolsData}
        happiness={frontendData.happiness}
        sponsor="reactforbeginners"
    />
)

export default Results
