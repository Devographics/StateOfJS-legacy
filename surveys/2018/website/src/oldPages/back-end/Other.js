import React from 'react'
import clone from 'lodash/clone'
import OthersTemplate from '../../components/templates/OthersTemplate'
import * as dto from '../../dto'
import backendData from '../../data/backend.json'

const baseTools = dto.othersBase(backendData.experienceByUsers)
const otherTools = clone(backendData.others.buckets).reverse()

const BackendOthers = props => (
    <OthersTemplate
        {...props}
        base={baseTools}
        baseKeys={backendData.keys}
        others={otherTools}
        section="Back-end"
    />
)

export default BackendOthers
