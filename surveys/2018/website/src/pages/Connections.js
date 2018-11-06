import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import TextBlock from '../components/blocks/TextBlock'
import Layout from '../components/common/Layout'
import SectionHeader from '../components/elements/SectionHeader'
import ToolsConnectionsBlock from '../components/blocks/ToolsConnectionsBlock'

const text = `
How many *React* users also use *Redux*? Do *GraphQL* fans prefer *Jest*? 
Are *Express* developers also into *Ember*?

This diagram lets you toggle categories on and off to explore the connections
between the inhabitants of the vast JavaScript ecosystem.

The size of each section corresponds to the number of respondents who have used each library
and would be willing to use it again. 
`
const Connections = ({ data: { connections }, ...rest }) => (
    <Layout {...rest}>
        <div className="Section">
            <SectionHeader />
            <TextBlock text={text} />
            <ToolsConnectionsBlock data={connections} />
        </div>
    </Layout>
)

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
    query {
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
