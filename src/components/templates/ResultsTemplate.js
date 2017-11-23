import React from 'react'
import ResultsBlock from '../blocks/ResultsBlock'
import ResultsSkillsBlock from '../blocks/ResultsSkillsBlock'
import ResourcesBlock from '../blocks/ResourcesBlock'
import TextBlock from '../blocks/TextBlock'

const Results = ({ data, description, section, sponsor }) => (
    <div>
    	<TextBlock text={description} />
        <ResultsBlock data={data} />
        <ResultsSkillsBlock data={data} />
        <ResourcesBlock section={section} sponsor={sponsor} />
    </div>
)

export default Results
