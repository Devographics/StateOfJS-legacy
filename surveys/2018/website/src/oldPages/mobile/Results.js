import React from 'react'
import mobileData from '../../data/mobile.json'
import ResultsTemplate from '../../components/templates/ResultsTemplate'
import * as dto from '../../dto'

const experienceData = dto.experience(mobileData.experience)
const numberOfToolsData = dto.experience(mobileData.numberOfToolsUsed)

const Results = () => (
    <ResultsTemplate
        section="Mobile"
        description={`
*PhoneGap/Cordova* have a high usage score, but a very low satisfaction ratio, which is never
a good sign. *React Native* might end up upsetting the current order of things soon, 
although it looks like *Native Apps* will always remain the most reliable solution no matter what. 

        `}
        keys={mobileData.keys}
        experienceData={experienceData}
        numberOfToolsData={numberOfToolsData}
        happiness={mobileData.happiness}
        sponsor="reactforbeginners"
    />
)

export default Results
