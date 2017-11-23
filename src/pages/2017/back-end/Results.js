import React from 'react'
import backendData from '../../../data/backend.json'
import ResultsTemplate from '../../../components/templates/ResultsTemplate'
import * as dto from '../../../dto'

const data = dto.experience(backendData.experience)

const Results = () =>
    <ResultsTemplate
        data={data}
        description={
`Here, we are talking about integrated solutions to build web applications from
the back-end side (including the database and the web server) to the front-end
layer, using only one language (JavaScript).

Let's face facts: unlike other categories like front-end frameworks, there are
very few true contenders in this category apart from Express.`
        }
        section="backend"
        sponsor="reactforbeginners"
    />

export default Results
