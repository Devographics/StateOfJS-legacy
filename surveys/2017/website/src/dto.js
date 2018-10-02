export const experience = tools => {
    const data = []
    for (let tool in tools) {
        data.push({ tool, ...tools[tool] })
    }

    return data
}

export const othersBase = tools => {
    const data = []
    for (let tool in tools) {
        const toolBucket = tools[tool]
        data.push({
            key: tool,
            doc_count: toolBucket.doc_count
        })
    }

    return data
}
