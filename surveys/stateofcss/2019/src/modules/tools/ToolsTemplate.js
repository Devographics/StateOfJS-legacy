import React from 'react'
import { graphql } from 'gatsby'
// import { PageContext } from 'core/helpers/pageContext'
// import { I18nContext } from 'core/i18n/i18nContext'
import PageTemplate from 'core/pages/PageTemplate'
// import ToolOpinionBlock from './blocks/ToolOpinionBlock'
// import ToolOverviewBlock from './blocks/ToolOverviewBlock';
// import ToolOtherBlock from './blocks/ToolOtherBlock';

const ToolsTemplate = ({ data }) => {
    // const context = useContext(PageContext)
    // const { translate } = useContext(I18nContext)
    return <PageTemplate data={data} />

    // return (
    //     <>
    //         <PageHeader
    //             introduction={
    //                 data.introduction !== null
    //                     ? data.introduction.html
    //                     : `[missing] ${context.id} introduction.`
    //             }
    //         />
    //         <ToolOverviewBlock id={context.id}/>
    //         {context.blocks.map(block => {
    //             const blockData = data.aggs.aggregations.find(a => a.id === block.id)
    //             const resources = data.aggs.fields.resources.find(r => r.id === block.id)

    //             if (!blockData) {
    //                 return <div key={block.id}>No data available for tool: {block.id}</div>
    //             }

    //             return (
    //                 <ToolOpinionBlock
    //                     key={block.id}
    //                     block={block}
    //                     buckets={blockData.buckets}
    //                     resources={resources}
    //                 />
    //             )
    //         })}
    //         <ToolOtherBlock/>
    //     </>
    // )
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
    query toolsAndMethodologiesSectionByIdAndLocale($id: String!, $locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: $id }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        data: toolsYaml(section_id: { eq: $id }) {
            aggregations {
                id
                total
                buckets {
                    id
                    count
                    percentage
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
