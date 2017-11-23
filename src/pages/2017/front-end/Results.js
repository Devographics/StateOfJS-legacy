import React from 'react'
import ResultsTemplate from '../../../components/templates/ResultsTemplate'
import frontendData from '../../../data/frontend.json'
import * as dto from '../../../dto'

const data = dto.experience(frontendData.experience)

const Results = () =>
    <ResultsTemplate
        data={data}
        description={
            `The battle for JavaScript mindshare is clearly led by front-end frameworks,
            and this comes through in the survey results: apart from relative newcomer
            Aurelia, every option here stands at over high awareness.`
        }
        section="frontend"
        sponsor="reactforbeginners"
    />

export default Results
