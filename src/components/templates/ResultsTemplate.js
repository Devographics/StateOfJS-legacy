import React from 'react'
import ResultsBlock from '../blocks/ResultsBlock'
import ResultsSkillsBlock from '../blocks/ResultsSkillsBlock'
import ResourcesBlock from '../blocks/ResourcesBlock'
import addParagraphs from '../../helpers/paragraphs'

const Results = ({ data, description, section, sponsor }) => (
    <div>
        <div className="block block--text" dangerouslySetInnerHTML={{__html: addParagraphs(description)}}/>
        <ResultsBlock data={data} />
        <ResultsSkillsBlock data={data} />
        <ResourcesBlock section={section} sponsor={sponsor} />
    </div>
)

export default Results
