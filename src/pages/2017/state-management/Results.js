import React from 'react'
import stateData from '../../../data/state.json'
import ResultsTemplate from '../../../components/templates/ResultsTemplate'
import * as dto from '../../../dto'

const data = dto.experience(stateData.experience)

const Results = () =>
    <ResultsTemplate
        data={data}
        description={
            `
State Management is an emerging category in JavaScript, and not necessarily one
every developer needs a tool for at the moment.

Redux is clearly the most popular of the Flux implementations, an architecture
championed by Facebook as a system for managing state globally in React or other
frontend libraries.
            `
        }
        section="statemanagement"
        sponsor="reactforbeginners"
    />

export default Results

