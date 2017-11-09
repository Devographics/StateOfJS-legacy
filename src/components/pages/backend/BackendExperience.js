import React from 'react'
import backendData from '../../../data/backend.json'
import Experience from '../../Experience'
import * as dto from '../../../dto'

const data = dto.experience(backendData.experience)

const BackendExperience = () => (
    <Experience
        title="Full-Stack frameworks"
        data={data}
        description={
            <div className="description">
                <p>
                    Here, we are talking about integrated solutions to build web applications from
                    the back-end side (including the database and the web server) to the front-end
                    layer, using only one language (JavaScript).
                </p>
                <p>
                    Let's face facts: unlike other categories like front-end frameworks, there are
                    very few true contenders in this category apart from Express.
                </p>
            </div>
        }
    />
)

export default BackendExperience
