import React from 'react'
import clone from 'lodash/clone'
import OthersTemplate from '../../../components/templates/OthersTemplate'
import * as dto from '../../../dto'
import mobileData from '../../../data/mobile.json'

// const baseTools = dto.othersBase(mobileData.experienceByUsers)
// const otherTools = clone(mobileData.others.buckets).reverse()

// const MobileOthers = () => (
//     <OthersTemplate
//     	base={baseTools}
//     	baseKeys={mobileData.keys}
//     	others={otherTools}
//      section="Mobile"
//     />
// )


const MobileOthers = () => <div>Others</div>

export default MobileOthers
