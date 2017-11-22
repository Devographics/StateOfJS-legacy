import React from 'react'
import clone from 'lodash/clone'
import OthersBarBlock from '../../../components/blocks/OthersBarsBlock'
import OthersBubbleBlock from '../../../components/blocks/OthersBubbleBlock'
import * as dto from '../../../dto'
import buildData from '../../../data/build.json'

const baseTools = dto.othersBase(buildData.experienceByUsers)
const otherTools = clone(buildData.others.buckets).reverse()

const BuildOthers = () => (
	<div>
    <OthersBarBlock
        base={baseTools}
        baseKeys={buildData.keys}
        others={otherTools}
    />
    <OthersBubbleBlock
        base={baseTools}
        baseKeys={buildData.keys}
        others={otherTools}
    />
    </div>

)

export default BuildOthers
