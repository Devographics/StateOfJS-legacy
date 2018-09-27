import React from 'react'
import clone from 'lodash/clone'
import OthersTemplate from '../../../components/templates/OthersTemplate'
import * as dto from '../../../dto'
import styleData from '../../../data/style.json'

const baseTools = dto.othersBase(styleData.experienceByUsers)
const otherTools = clone(styleData.others.buckets).reverse()

const StyleOthers = () => (
    <OthersTemplate base={baseTools} baseKeys={styleData.keys} others={otherTools} section="CSS" />
)

export default StyleOthers
