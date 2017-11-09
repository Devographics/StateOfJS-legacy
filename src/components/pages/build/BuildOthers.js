import React from 'react'
import clone from 'lodash/clone'
import Others from '../../Others'
import * as dto from '../../../dto'
import buildData from '../../../data/build.json'

const baseTools = dto.othersBase(buildData.experienceByUsers)
const otherTools = clone(buildData.others.buckets).reverse()

const BuildOthers = () => (
    <Others
        title="Other Build tools (Mentions)"
        base={baseTools}
        baseKeys={buildData.keys}
        others={otherTools}
    />
)

export default BuildOthers
