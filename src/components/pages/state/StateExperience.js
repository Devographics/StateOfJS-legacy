import React from 'react'
import stateData from '../../../data/state.json'
import Experience from '../../Experience'
import * as dto from '../../../dto'

const data = dto.experience(stateData.experience)

const StateExperience = () => (
    <Experience
        title="JavaScript state management"
        data={data}
        description={
            <div className="description">
                <p>
                    State Management is an emerging category in JavaScript, and not necessarily one
                    every developer needs a tool for at the moment.
                </p>
                <p>
                    Redux is clearly the most popular of the Flux implementations, an architecture
                    championed by Facebook as a system for managing state globally in React or other
                    frontend libraries.
                </p>
            </div>
        }
    />
)

export default StateExperience
