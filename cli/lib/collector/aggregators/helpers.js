'use strict'

const { maxBy } = require('lodash')

/**
 * Fix percentages for a given set of buckets.
 * Because rounding often ends up with a value != 100%,
 * we take the higher bucket and apply the diff on its average.
 *
 * Be aware that this function may mutates the higher bucket.
 *
 * @param {Array.<Object>} buckets
 */
exports.fixBucketsPercentages = buckets => {
    const total = buckets.reduce((t, { percentage }) => t + percentage, 0)

    const diff = 100 - total
    if (diff !== 0) {
        const higherBucket = maxBy(buckets, 'percentage')
        higherBucket.percentage = higherBucket.percentage + diff
    }
}
