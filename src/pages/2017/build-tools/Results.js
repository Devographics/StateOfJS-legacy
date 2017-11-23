import React from 'react'
import buildData from '../../../data/build.json'
import ResultsTemplate from '../../../components/templates/ResultsTemplate'
import * as dto from '../../../dto'

const data = dto.experience(buildData.experience)

const Results = () =>
    <ResultsTemplate
        data={data}
        description={
            `Build tools have been around long before JavaScript. With Make’s initial release
                    in 1977 and JavaScript’s in 1996, it’s interesting to see JavaScript developers'
                    take on this “old timey” form of software.`
        }
        section="buildtools"
        sponsor="reactforbeginners"
    />

export default Results
