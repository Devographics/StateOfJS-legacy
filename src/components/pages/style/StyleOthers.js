import React from 'react'
import clone from 'lodash/clone'
import Others from '../../Others'
import * as dto from '../../../dto'
import styleData from '../../../data/style.json'

const baseTools = dto.othersBase(styleData.experienceByUsers)
const otherTools = clone(styleData.others.buckets).reverse()

const StyleOthers = () => (
    <Others
        title="Other Styling/CSS solutions (Mentions)"
        base={baseTools}
        baseKeys={styleData.keys}
        others={otherTools}
    />
)

export default StyleOthers
