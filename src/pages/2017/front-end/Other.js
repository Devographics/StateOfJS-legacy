import React from 'react'
import clone from 'lodash/clone'
import OthersBarBlock from '../../../components/blocks/OthersBarsBlock'
import OthersBubbleBlock from '../../../components/blocks/OthersBubbleBlock'
import * as dto from '../../../dto'
import frontendData from '../../../data/frontend.json'

const baseTools = dto.othersBase(frontendData.experienceByUsers)
const otherTools = clone(frontendData.others.buckets).reverse()

const FrontendOthers = () => (
	<div>
	    <OthersBarBlock base={baseTools} baseKeys={frontendData.keys} others={otherTools} />
	    <OthersBubbleBlock base={baseTools} baseKeys={frontendData.keys} others={otherTools} />
	</div>
)

export default FrontendOthers
