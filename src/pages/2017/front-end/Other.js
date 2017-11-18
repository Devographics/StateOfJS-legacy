import React from 'react'
import clone from 'lodash/clone'
import Others from '../../../components/Others'
import * as dto from '../../../dto'
import frontendData from '../../../data/frontend.json'

const baseTools = dto.othersBase(frontendData.experienceByUsers)
const otherTools = clone(frontendData.others.buckets).reverse()

const FrontendOthers = () => (
    <Others base={baseTools} baseKeys={frontendData.keys} others={otherTools} />
)

export default FrontendOthers
