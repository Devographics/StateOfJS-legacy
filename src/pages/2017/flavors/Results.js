import React from 'react'
import flavorData from '../../../data/flavor.json'
import ResultsTemplate from '../../../components/templates/ResultsTemplate'
import * as dto from '../../../dto'

const data = dto.experience(flavorData.experience)

const Results = () =>
    <ResultsTemplate
        data={data}
        description={
            `
When you talk about JavaScript, you're not just talking about a single
language: it's actually more like a set of “flavors” that all compile down
to the same target.

What started with CoffeeScript back in 2009 has become an explosion of choice
over the past couple years: ES6, TypeScript, Elm… they all have their strengths,
and they're all growing more and more popular.
                `
        }
        section="flavors"
        sponsor="reactforbeginners"
    />

export default Results
