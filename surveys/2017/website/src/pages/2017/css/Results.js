import React from 'react'
import styleData from '../../../data/style.json'
import ResultsTemplate from '../../../components/templates/ResultsTemplate'
import * as dto from '../../../dto'

const experienceData = dto.experience(styleData.experience)
const numberOfToolsData = dto.experience(styleData.numberOfToolsUsed)

const Results = () => (
    <ResultsTemplate
        section="CSS"
        description={`
Much has been made about new *CSS-in-JS* approaches like Styled Components, especially in 
the React ecosystem.

But as the results show, for now developers still prefer the safety of mainstays like
 *SASS/SCSS* or even *Plain CSS*. 
`}
        keys={styleData.keys}
        experienceData={experienceData}
        numberOfToolsData={numberOfToolsData}
        happiness={styleData.happiness}
        sponsor="reactforbeginners"
    />
)

export default Results
