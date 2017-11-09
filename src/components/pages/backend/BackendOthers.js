import React from 'react'
import clone from 'lodash/clone'
import Others from '../../Others'
import * as dto from '../../../dto'
import backendData from '../../../data/backend.json'

const baseTools = dto.othersBase(backendData.experienceByUsers)
const otherTools = clone(backendData.others.buckets).reverse()

const BackendOthers = () => (
    <Others
        title="Other Full-Stack frameworks (Mentions)"
        base={baseTools}
        baseKeys={backendData.keys}
        others={otherTools}
    />
)

export default BackendOthers
