const elastic = require('../loaders/elastic')

exports.computeToolsMatrixForSurveyAndOpinion = async (
    sections,
    surveyId,
    opinion
) => {
    const toolIndexesBySection = []

    let toolIndex = 0
    const tools = Object.keys(sections).reduce((acc, section) => {
        const sectionTools = sections[section].tools
        const sectionIndexes = { section, indexes: [] }
        toolIndexesBySection.push(sectionIndexes)

        return [
            ...acc,
            ...sectionTools.map(tool => {
                const toolEntry = {
                    tool,
                    index: toolIndex,
                    section,
                }
                sectionIndexes.indexes.push(toolIndex)
                toolIndex++
            
                return toolEntry
            })
        ]
    }, [])

    const subAggs = tools.reduce((aggs, tool) => ({
        ...aggs,
        [tool.tool]: {
            filter: {
                term: {
                    [`tools.${tool.tool}.opinion.keyword`]: opinion,
                },
            },
        },
    }), {})

    const result = await elastic.search({
        size: 0,
        body: {
            query: {
                bool: {
                    must: [{
                        term: {
                            'survey.keyword': {
                                value: surveyId,
                            },
                        },
                    }],
                },
            },
            aggs: tools.reduce((aggs, tool) => ({
                ...aggs,
                [tool.tool]: {
                    filter: {
                        term: {
                            [`tools.${tool.tool}.opinion.keyword`]: opinion,
                        },
                    },
                    aggs: subAggs,
                },
            }), {}),
        }
    })

    const matrix = tools.map(tool => {
        const toolAggs = result.aggregations[tool.tool]
        return tools.map(t => toolAggs[t.tool].doc_count)
    })

    const data = {
        matrix,
        keys: tools.map(tool => tool.tool),
        indexesBySection: toolIndexesBySection,
    }

    return data
}
