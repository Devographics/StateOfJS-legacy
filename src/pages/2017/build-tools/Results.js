import React from 'react'
import buildData from '../../../data/build.json'
import ResultsBlock from '../../../components/ResultsBlock'
import * as dto from '../../../dto'

const data = dto.experience(buildData.experience)

const BuildExperience = () => (
    <ResultsBlock
        title="Build tools"
        data={data}
        description={
            <div className="description">
                <p>
                    Build tools have been around long before JavaScript. With Make’s initial release
                    in 1977 and JavaScript’s in 1996, it’s interesting to see JavaScript developers'
                    take on this “old timey” form of software.
                </p>
            </div>
        }
    />
)

export default BuildExperience
