'use strict'

module.exports = (leftKeys, rightKeys, aggs) => {
    const allKeys = [...leftKeys, ...rightKeys]

    const nodes = allKeys.map(key => ({ id: key }))
    const links = []

    leftKeys.forEach(source => {
        rightKeys.forEach(target => {
            const value = aggs[source][target].doc_count
            if (value > 0) {
                links.push({ source, target, value })
            }
        })
    })

    return { nodes, links }
}
