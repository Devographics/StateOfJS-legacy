'use strict'

/**
 * Compute chord matrix and keys.
 *
 * @param {Array.<string>} leftKeys
 * @param {Array.<string>} rightKeys
 * @param {Object}         aggs
 * @return {Object}
 */
module.exports = (leftKeys, rightKeys, aggs) => {
    const keys = [...leftKeys, ...rightKeys]

    const matrix = []

    leftKeys.forEach(leftKey => {
        const row = []
        leftKeys.forEach(() => {
            row.push(0)
        })
        rightKeys.forEach(rightKey => {
            row.push(aggs[leftKey][rightKey].doc_count)
        })
        matrix.push(row)
    })

    rightKeys.forEach(righKey => {
        const row = []
        leftKeys.forEach(leftKey => {
            row.push(aggs[leftKey][righKey].doc_count)
        })
        rightKeys.forEach(() => {
            row.push(0)
        })
        matrix.push(row)
    })

    return { keys, matrix }
}
