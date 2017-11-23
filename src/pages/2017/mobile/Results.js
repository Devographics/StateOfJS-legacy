import React from 'react'
import mobileData from '../../../data/mobile.json'
import ResultsTemplate from '../../../components/templates/ResultsTemplate'
import * as dto from '../../../dto'

const data = dto.experience(mobileData.experience)

const Results = () =>
    <ResultsTemplate
        data={data}
        description={
            `
            The landscape for building mobile apps with JavaScript is still very young, and
            as expected, the Native Apps category still pulls in the highest awareness
            rating of the survey, as well as a very high satisfaction rating.
       
            The challenge with native platforms is a doubling of cost/effort when you want
            to cover more platforms. This was often a non-issue in the past, because
            customers and clients of mine would only care about targeting iOS thanks to its
            huge userbase.
        `
        }
        section="mobile"
        sponsor="reactforbeginners"
    />

export default Results

