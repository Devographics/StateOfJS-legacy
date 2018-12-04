import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import TextBlock from 'core/blocks/TextBlock'
import Layout from 'core/Layout'
import PageHeader from 'core/pages/PageHeader'
import ToolsConnectionsBlock from 'modules/connections/ToolsConnectionsBlock'

const Connections = ({ data, ...rest }) => {
    return (
        <Layout {...rest}>
            <div className="Section">
                <PageHeader />
                <TextBlock text={data.introduction.html} />
                <ToolsConnectionsBlock data={data.connections} chartId="connections" />
            </div>
        </Layout>
    )
}

Connections.propTypes = {
    data: PropTypes.shape({
        connections: PropTypes.shape({
            matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
            keys: PropTypes.arrayOf(PropTypes.string).isRequired,
            indexesBySection: PropTypes.arrayOf(
                PropTypes.shape({
                    section: PropTypes.string.isRequired,
                    indexes: PropTypes.arrayOf(PropTypes.number).isRequired
                })
            ).isRequired
        }).isRequired
    }).isRequired
}

export default Connections

export const query = graphql`
    query connections($locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                section: { eq: "connections" }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        connections: connectionsYaml {
            matrix
            keys
            indexesBySection {
                section
                indexes
            }
        }
    }
`
