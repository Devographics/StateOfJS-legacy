import React from 'react'
import clone from 'lodash/clone'
import OthersBarBlock from '../../../components/blocks/OthersBarsBlock'
import OthersBubbleBlock from '../../../components/blocks/OthersBubbleBlock'
import * as dto from '../../../dto'
import stateData from '../../../data/state.json'

const baseTools = dto.othersBase(stateData.experienceByUsers)
const otherTools = clone(stateData.others.buckets).reverse()

const StateOthers = () => (
	<div>
    <OthersBarBlock
        base={baseTools}
        baseKeys={stateData.keys}
        others={otherTools}
    />
    <OthersBubbleBlock
        base={baseTools}
        baseKeys={stateData.keys}
        others={otherTools}
    />
    </div>
)

export default StateOthers
