import React from 'react'
import clone from 'lodash/clone'
import OthersBarBlock from '../../../components/blocks/OthersBarsBlock'
import OthersBubbleBlock from '../../../components/blocks/OthersBubbleBlock'
import * as dto from '../../../dto'
import styleData from '../../../data/style.json'

const baseTools = dto.othersBase(styleData.experienceByUsers)
const otherTools = clone(styleData.others.buckets).reverse()

const StyleOthers = () => (
	<div>
    <OthersBarBlock
        base={baseTools}
        baseKeys={styleData.keys}
        others={otherTools}
    />
    <OthersBubbleBlock
        base={baseTools}
        baseKeys={styleData.keys}
        others={otherTools}
    />
    </div>
)

export default StyleOthers
