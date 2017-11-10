import React from 'react'
import clone from 'lodash/clone'
import Others from '../../../components/Others'
import * as dto from '../../../dto'
import testingData from '../../../data/testing.json'

const baseTools = dto.othersBase(testingData.experienceByUsers)
const otherTools = clone(testingData.others.buckets).reverse()

const TestingOthers = () => (
    <Others
        title="Other Testing frameworks (Mentions)"
        base={baseTools}
        baseKeys={testingData.keys}
        others={otherTools}
    />
)

export default TestingOthers
