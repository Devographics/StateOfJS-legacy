import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { PageContext } from 'core/pages/pageContext'
// import { I18nContext } from 'core/i18n/i18nContext'
import PageHeader from 'core/pages/PageHeader'
import ToolOpinionBlock from './blocks/ToolOpinionBlock'
import ToolOverviewBlock from './blocks/ToolOverviewBlock';
import ToolOtherBlock from './blocks/ToolOtherBlock';

const ToolsTemplate = ({ data }) => {
    const context = useContext(PageContext)
    // const { translate } = useContext(I18nContext)

    return (
        <>
            <PageHeader
                introduction={
                    data.introduction !== null
                        ? data.introduction.html
                        : `[missing] ${context.id} introduction.`
                }
            />
            <ToolOverviewBlock id={context.id}/>
            {context.blocks.map(block => {
                const blockData = data.aggs.aggregations.find(a => a.id === block.id)
                const resources = data.aggs.fields.resources.find(r => r.id === block.id)

                if (!blockData) {
                    return <div key={block.id}>No data available for tool: {block.id}</div>
                }

                return (
                    <ToolOpinionBlock
                        key={block.id}
                        block={block}
                        buckets={blockData.buckets}
                        resources={resources}
                    />
                )
            })}
            <ToolOtherBlock/>
        </>
    )
}

export default ToolsTemplate

/*
github {
    name
    full_name
    description
    url
    stars
    forks
    opened_issues
    homepage
}
*/

export const query = graphql`
    query toolsByLocale($id: String!, $locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: $id }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        aggs: toolsYaml(section_id: { eq: $id }) {
            id
            aggregations {
                id
                total
                buckets {
                    id
                    count
                }
            }
            fields {
                resources {
                    id
                }
            }
        }
    }
`
