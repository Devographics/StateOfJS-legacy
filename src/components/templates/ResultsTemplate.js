import React from 'react'
import PropTypes from 'prop-types'
import ResultsBlock from '../blocks/ResultsBlock'
import NumberOfLibrariesBlock from '../blocks/NumberOfLibrariesBlock'
import ResourcesBlock from '../blocks/ResourcesBlock'
import TextBlock from '../blocks/TextBlock'
import Meta from '../elements/Meta'

const Results = ({ section, description, keys, experienceData, numberOfToolsData, sponsor }) => (
    <div className="template">
        <Meta section={section} subSection="results" />
        <TextBlock text={description} />
        <ResultsBlock data={experienceData} section={section} />
        <NumberOfLibrariesBlock keys={keys} data={numberOfToolsData} />
        <ResourcesBlock section={section} />
    </div>
)

Results.propTypes = {
    section: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    keys: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    experienceData: PropTypes.arrayOf(
        PropTypes.shape({
            tool: PropTypes.string.isRequired,
        })
    ).isRequired,
    numberOfToolsData: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.number.isRequired,
            doc_count: PropTypes.number.isRequired,
        })
    ).isRequired,
}

export default Results
