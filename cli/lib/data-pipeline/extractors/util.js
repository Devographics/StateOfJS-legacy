const ignore = [
    ' ',
    '\n',
    '\n\n',
    '/',
    '\\',
    '*',
    '+',
    '-',
    '—',
    'n/a',
    'N/A',
    'NA',
    'None',
    'none',
    'no',
    'No',
    '.',
    '?'
]
exports.cleanupValue = value => (ignore.includes(value) ? null : value)

/**
 * Generates a normalizer from an array of rules.
 * The normalizer will return the first matching
 * rule normalized value.
 *
 * @see multiNormalizer
 */
exports.uniNormalizer = rules => value => {
    for (let rule of rules) {
        const [pattern, normalized] = rule
        if (value.match(pattern) !== null) {
            return normalized
        }
    }

    return value
}

/**
 * Generates a normalizer from an array of rules.
 * The normalizer will return all matching
 * rules normalized value.
 *
 * @see uniNormalizer
 */
exports.multiNormalizer = rules => value => {
    const normalizedItems = []

    for (let rule of rules) {
        const [pattern, normalized] = rule
        if (value.match(pattern) !== null) {
            normalizedItems.push(normalized)
        }
    }

    return normalizedItems
}
