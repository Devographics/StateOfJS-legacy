'use strict'

/**
 * Compute chord matrix and keys.
 *
 * @param {Array.<string>} keys
 * @param {Object}         aggs
 *
 * @return {Object}
 */
module.exports = (keys, aggs) => {
    const matrix = keys.map(key => {
        const bucket = aggs[key]

        return keys.map(relatedKey => {
            if (key === relatedKey) return 0

            return bucket[relatedKey] ? bucket[relatedKey].doc_count : 0
        })
    })

    return { keys, matrix }
}
