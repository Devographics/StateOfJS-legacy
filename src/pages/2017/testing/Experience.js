import React from 'react'
import testingData from '../../../data/testing.json'
import Experience from '../../../components/Experience'
import * as dto from '../../../dto'

const data = dto.experience(testingData.experience)

const TestingExperience = () => (
    <Experience
        title="Testing frameworks"
        data={data}
        description={
            <div className="description">
                <p>
                    Like the rest of Javascript world, the testing landscape is highly competitive
                    one, with rapid release cycles, feature and performance comparisons, and
                    constant one-upsmanship between the frameworks.
                </p>
            </div>
        }
    />
)

export default TestingExperience
