import React from 'react'
import clone from 'lodash/clone'
import OthersTemplate from '../../../components/templates/OthersTemplate'
import * as dto from '../../../dto'
import stateData from '../../../data/state.json'

const baseTools = dto.othersBase(stateData.experienceByUsers)
const otherTools = clone(stateData.others.buckets).reverse()

const StateOthers = () => (
    <OthersTemplate
        base={baseTools}
        baseKeys={stateData.keys}
        others={otherTools}
    />
)

export default StateOthers
