import React from 'react'
import frontendData from '../../../data/frontend.json'
import ResultsBlock from '../../../components/blocks/ResultsBlock'
import * as dto from '../../../dto'
import ResourcesBlock from '../../../components/blocks/ResourcesBlock'

const data = dto.experience(frontendData.experience)

const FrontendExperience = () => (
    <div>
        <ResultsBlock
            data={data}
            description={
                <div className="description">
                    <p>
                        The battle for JavaScript mindshare is clearly led by front-end frameworks,
                        and this comes through in the survey results: apart from relative newcomer
                        Aurelia, every option here stands at over high awareness.
                    </p>
                </div>
            }
        />

        <ResourcesBlock section="frontend" sponsor="reactforbeginners" />
    </div>
)

export default FrontendExperience
