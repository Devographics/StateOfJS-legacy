import React from 'react'
import flavorData from '../../../data/flavor.json'
import Experience from '../../Experience'
import * as dto from '../../../dto'

const data = dto.experience(flavorData.experience)

const FlavorExperience = () => (
    <Experience
        title="JavaScript flavors"
        data={data}
        description={
            <div className="description">
                <p>
                    When you talk about “JavaScript”, you're not just talking about a single
                    language: it's actually more like a family of closely related cousins.
                </p>
                <p>
                    What started with CoffeeScript back in 2009 has become an explosion of choice
                    over the past couple years: ES6, TypeScript, Elm… they all have their strengths,
                    and they're all growing more and more popular.
                </p>
            </div>
        }
    />
)

export default FlavorExperience
