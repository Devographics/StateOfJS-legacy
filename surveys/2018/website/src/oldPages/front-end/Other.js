import React from 'react'
import clone from 'lodash/clone'
import OthersTemplate from '../../components/templates/OthersTemplate'
import * as dto from '../../dto'
import frontendData from '../../data/frontend.json'

const baseTools = dto.othersBase(frontendData.experienceByUsers)
const otherTools = clone(frontendData.others.buckets).reverse()

const FrontendOthers = () => (
    <OthersTemplate
        base={baseTools}
        baseKeys={frontendData.keys}
        others={otherTools}
        section="Front-end"
    />
)

export default FrontendOthers
