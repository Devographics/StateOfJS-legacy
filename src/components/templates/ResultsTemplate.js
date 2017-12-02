import React from 'react'
import ResultsBlock from '../blocks/ResultsBlock'
import NumberOfLibrariesBlock from '../blocks/NumberOfLibrariesBlock'
import ResourcesBlock from '../blocks/ResourcesBlock'
import TextBlock from '../blocks/TextBlock'
import Meta from '../elements/Meta'

const Results = ({ data, description, section, sponsor }) => (
    <div className="template">
        <Meta section={section} subSection="results" />
        <TextBlock text={description} />
        <ResultsBlock data={data} section={section} />
        {/*<NumberOfLibrariesBlock data={data} />*/}
        <ResourcesBlock section={section} />
    </div>
)

export default Results
