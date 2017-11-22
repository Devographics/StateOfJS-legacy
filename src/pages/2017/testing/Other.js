import React from 'react'
import clone from 'lodash/clone'
import OthersBarBlock from '../../../components/blocks/OthersBarsBlock'
import OthersBubbleBlock from '../../../components/blocks/OthersBubbleBlock'
import * as dto from '../../../dto'
import testingData from '../../../data/testing.json'

const baseTools = dto.othersBase(testingData.experienceByUsers)
const otherTools = clone(testingData.others.buckets).reverse()

const TestingOthers = () => (
	<div>
    <OthersBarBlock
        base={baseTools}
        baseKeys={testingData.keys}
        others={otherTools}
    />
    <OthersBubbleBlock
        base={baseTools}
        baseKeys={testingData.keys}
        others={otherTools}
    />
    </div>
)

export default TestingOthers
