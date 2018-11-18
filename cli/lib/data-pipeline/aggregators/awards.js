const elastic = require('../loaders/elastic')
const Opinion = require('../../../conf/experience')

const fetchAllTools = async currentSurvey => {
    const result = await elastic.search({
        size: 0,
        body: {
            query: {
                bool: {
                    must: [
                        {
                            term: {
                                'survey.keyword': currentSurvey.id
                            }
                        }
                    ]
                }
            },
            aggs: currentSurvey.tools.reduce(
                (acc, tool) => ({
                    ...acc,
                    [tool]: {
                        terms: {
                            field: `tools.${tool}.opinion.keyword`,
                            size: 5
                        }
                    }
                }),
                {}
            )
        }
    })

    return currentSurvey.tools.map(tool => ({
        tool,
        opinions: result.aggregations[tool].buckets
    }))
}

exports.hightestSatisfaction = async (currentSurvey, blacklist = []) => {
    const tools = await fetchAllTools(currentSurvey)
    const rankedTools = tools
        .filter(t => !blacklist.includes(t.tool))
        .map(tool => {
            const satisfiedUsers = tool.opinions.find(b => b.key === Opinion.WOULD_USE).doc_count
            const unsatisfiedUsers = tool.opinions.find(b => b.key === Opinion.WOULD_NOT_USE)
                .doc_count
            const total = satisfiedUsers + unsatisfiedUsers

            return {
                id: tool.tool,
                [Opinion.WOULD_USE]: satisfiedUsers,
                [Opinion.WOULD_NOT_USE]: unsatisfiedUsers,
                total,
                percentage: Number(((satisfiedUsers / total) * 100).toFixed(1))
            }
        })
        .sort((a, b) => a.percentage - b.percentage)
        .reverse()

    return rankedTools.slice(0, 3)
}

exports.highestInterest = async (currentSurvey, blacklist = []) => {
    const tools = await fetchAllTools(currentSurvey)
    const rankedTools = tools
        .filter(t => !blacklist.includes(t.tool))
        .map(tool => {
            const interestedUsers = tool.opinions.find(b => b.key === Opinion.INTERESTED).doc_count
            const uninterestedUsers = tool.opinions.find(b => b.key === Opinion.NOT_INTERESTED)
                .doc_count
            const total = interestedUsers + uninterestedUsers

            return {
                id: tool.tool,
                [Opinion.INTERESTED]: interestedUsers,
                [Opinion.NOT_INTERESTED]: uninterestedUsers,
                total,
                percentage: Number(((interestedUsers / total) * 100).toFixed(1))
            }
        })
        .sort((a, b) => a.percentage - b.percentage)
        .reverse()

    return rankedTools.slice(0, 3)
}

exports.highestUsage = async (currentSurvey, blacklist = []) => {
    const tools = await fetchAllTools(currentSurvey)
    const rankedTools = tools
        .filter(t => !blacklist.includes(t.tool))
        .map(tool => {
            const satisfiedUsers = tool.opinions.find(b => b.key === Opinion.WOULD_USE).doc_count
            const unsatisfiedUsers = tool.opinions.find(b => b.key === Opinion.WOULD_NOT_USE)
                .doc_count
            const total = satisfiedUsers + unsatisfiedUsers

            return {
                id: tool.tool,
                [Opinion.WOULD_USE]: satisfiedUsers,
                [Opinion.WOULD_NOT_USE]: unsatisfiedUsers,
                count: total
            }
        })
        .sort((a, b) => a.count - b.count)
        .reverse()

    return rankedTools.slice(0, 3)
}

exports.mostMentioned = async (currentSurvey, blacklist = []) => {
    const result = await elastic.search({
        size: 0,
        body: {
            query: {
                bool: {
                    must: [
                        {
                            term: {
                                'survey.keyword': currentSurvey.id
                            }
                        }
                    ]
                }
            },
            aggs: Object.keys(currentSurvey.sections).reduce(
                (acc, section) => ({
                    ...acc,
                    [section]: {
                        terms: {
                            field: `sections_other_tools.${section}.norm.keyword`
                        }
                    }
                }),
                {}
            )
        }
    })

    const rankedTools = Object.keys(currentSurvey.sections)
        .reduce((acc, section) => {
            const sectionOtherTools = result.aggregations[section]

            return [...acc, ...sectionOtherTools.buckets]
        }, [])
        .map(d => ({
            id: d.key,
            count: d.doc_count
        }))
        .filter(t => !blacklist.includes(t.id))
        .sort((a, b) => a.count - b.count)
        .reverse()

    return rankedTools.slice(0, 3)
}
