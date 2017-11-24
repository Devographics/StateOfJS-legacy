import React from 'react'
import clone from 'lodash/clone'
import OthersBarBlock from '../blocks/OthersBarsBlock'
import OthersBubbleBlock from '../blocks/OthersBubbleBlock'
import * as dto from '../../dto'
import frontendData from '../../data/frontend.json'
import Meta from '../elements/Meta'

const baseTools = dto.othersBase(frontendData.experienceByUsers)
const otherTools = clone(frontendData.others.buckets).reverse()

const OthersTemplate = props => (
	<div className="template">
    	<Meta section={props.section} subSection="others" />
	    <OthersBarBlock {...props} />
	    <OthersBubbleBlock {...props} />
	</div>
)

export default OthersTemplate
