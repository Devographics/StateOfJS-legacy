import React from 'react'
import PropTypes from 'prop-types'
import ResultsBlock from '../blocks/ResultsBlock'
import NumberOfLibrariesBlock from '../blocks/NumberOfLibrariesBlock'
import ResourcesBlock from '../blocks/ResourcesBlock'
import HappinessBlock from '../blocks/HappinessBlock'
import TextBlock from '../blocks/TextBlock'
import Meta from '../elements/Meta'
import Layout from '../common/Layout'

const Results = ({ section, description, keys, experienceData, numberOfToolsData, happiness, projects }) => (
    <Layout>
        <div className="template">
            <Meta section={section} subSection="results" />
            <TextBlock text={description} />
            <ResultsBlock data={experienceData} section={section} />
            <NumberOfLibrariesBlock keys={keys} data={numberOfToolsData} section={section} />
            <HappinessBlock section={section} value={happiness} projects={projects} />
            <ResourcesBlock section={section} />
        </div>
    </Layout>
)

Results.propTypes = {
    section: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    keys: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    experienceData: PropTypes.arrayOf(
        PropTypes.shape({
            tool: PropTypes.string.isRequired
        })
    ).isRequired,
    numberOfToolsData: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.number.isRequired,
            doc_count: PropTypes.number.isRequired
        })
    ).isRequired,
    happiness: PropTypes.number.isRequired
}

export default Results
