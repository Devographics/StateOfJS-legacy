import React from 'react'
import buildData from '../../data/build.json'
import ResultsTemplate from '../../components/templates/ResultsTemplate'
import * as dto from '../../dto'

const experienceData = dto.experience(buildData.experience)
const numberOfToolsData = dto.experience(buildData.numberOfToolsUsed)

const Results = (props) => (
    <ResultsTemplate
    {...props}
        section="Build Tools"
        description={`Apart from *NPM*, *Webpack* is still the king of build tools. This is no doubt due to 
the rise of no-config Webpack wrappers like Create-React-App and Next.js. 

This could prove itself a double-edged sword though: if a better alternative ever comes along, these libraries
might end up switching to it without a second thought.`}
        keys={buildData.keys}
        experienceData={experienceData}
        numberOfToolsData={numberOfToolsData}
        happiness={buildData.happiness}
        sponsor="reactforbeginners"
    />
)

export default Results
