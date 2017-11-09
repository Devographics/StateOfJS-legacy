import React from 'react'
import frontendData from '../../../data/frontend.json'
import Experience from '../../Experience'
import * as dto from '../../../dto'

const data = dto.experience(frontendData.experience)

const FrontendExperience = () => (
    <Experience
        title="Frontend frameworks"
        data={data}
        description={
            <div className="description">
                <p>
                    The battle for JavaScript mindshare is clearly led by front-end frameworks, and
                    this comes through in the survey results: apart from relative newcomer Aurelia,
                    every option here stands at over high awareness.
                </p>
            </div>
        }
    />
)

export default FrontendExperience
