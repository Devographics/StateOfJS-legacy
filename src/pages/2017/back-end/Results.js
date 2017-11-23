import React from 'react'
import backendData from '../../../data/backend.json'
import ResultsTemplate from '../../../components/templates/ResultsTemplate'
import * as dto from '../../../dto'

const data = dto.experience(backendData.experience)

const Results = () =>
    <ResultsTemplate
        data={data}
        description={
`
Let's face facts: unlike other categories, there are
very few true contenders here apart from *Express*. Although *Meteor* did 
manage to generate a lot of awareness over the years, it sadly seems like it 
wasn't quite able to capitalize on it. 
`
        }
        section="backend"
        sponsor="reactforbeginners"
    />

export default Results
