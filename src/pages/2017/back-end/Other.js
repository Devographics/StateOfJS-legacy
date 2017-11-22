import React from 'react'
import clone from 'lodash/clone'
import OthersBarBlock from '../../../components/blocks/OthersBarsBlock'
import OthersBubbleBlock from '../../../components/blocks/OthersBubbleBlock'
import * as dto from '../../../dto'
import backendData from '../../../data/backend.json'

const baseTools = dto.othersBase(backendData.experienceByUsers)
const otherTools = clone(backendData.others.buckets).reverse()

const BackendOthers = () => (
	<div>
	    <OthersBarBlock base={baseTools} baseKeys={backendData.keys} others={otherTools} />
	    <OthersBubbleBlock base={baseTools} baseKeys={backendData.keys} others={otherTools} />
    </div>
)

export default BackendOthers
