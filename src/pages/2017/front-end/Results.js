import React from 'react'
import ResultsTemplate from '../../../components/templates/ResultsTemplate'
import frontendData from '../../../data/frontend.json'
import * as dto from '../../../dto'

const data = dto.experience(frontendData.experience)

const Results = () =>
    <ResultsTemplate
        data={data}
        description={
`As always, the battle for JavaScript mindshare is led by front-end frameworks.

*React* is still the dominant player here, but *Vue* is making big gains on the back of
*Angular*'s diminishing popularity. By 2018, this chart might end up looking very different!`
        }
        section="frontend"
        sponsor="reactforbeginners"
    />

export default Results
