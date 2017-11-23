import React from 'react'
import ResultsBlock from '../blocks/ResultsBlock'
import ResultsSkillsBlock from '../blocks/ResultsSkillsBlock'
import ResourcesBlock from '../blocks/ResourcesBlock'

const Results = ({ data, description, section, sponsor }) => (
    <div>
        {/*
        <div className="block block--text"><p>{description}</p></div>
        */}
        <ResultsBlock data={data} description={description}/>
        <ResultsSkillsBlock data={data} />
        <ResourcesBlock section={section} sponsor={sponsor} />
    </div>
)

export default Results
