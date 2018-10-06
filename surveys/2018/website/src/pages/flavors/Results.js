import React from 'react'
import flavorData from '../../data/flavor.json'
import ResultsTemplate from '../../components/templates/ResultsTemplate'
import * as dto from '../../dto'

const experienceData = dto.experience(flavorData.experience)
const numberOfToolsData = dto.experience(flavorData.numberOfToolsUsed)

const Results = (props) => (
    <ResultsTemplate
        {...props}
        section="Flavors"
        description={`
When you talk about JavaScript, you're not just talking about a single
language, but about a range of “flavors” that all compile down
to the same target.

Although *ES6* is now a well-established standard, it might one day be challenged by
the rise of *TypeScript*, who is quickly becoming the leader in the typed
JavaScript space. 
                `}
        keys={flavorData.keys}
        experienceData={experienceData}
        numberOfToolsData={numberOfToolsData}
        happiness={flavorData.happiness}
        sponsor="reactforbeginners"
    />
)

export default Results
