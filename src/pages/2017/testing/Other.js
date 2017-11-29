import React from 'react'
import clone from 'lodash/clone'
import OthersTemplate from '../../../components/templates/OthersTemplate'
import * as dto from '../../../dto'
import testingData from '../../../data/testing.json'

const baseTools = dto.othersBase(testingData.experienceByUsers)
const otherTools = clone(testingData.others.buckets).reverse()

const TestingOthers = () => (
    <OthersTemplate
        base={baseTools}
        baseKeys={testingData.keys}
        others={otherTools}
        section="Testing"
    />
)

export default TestingOthers
