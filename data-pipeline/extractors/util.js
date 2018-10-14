

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
    '?',
]
exports.cleanupValue = value => (ignore.includes(value) ? null : value)

exports.extractToolsFromText = rules => value => {
    const tools = []

    // loop over rules and return normalized value if some matches
    for (let rule of rules) {
        const [pattern, normalized] = rule
        if (value.match(pattern) !== null) {
            tools.push(normalized)
        }
    }

    return tools
}

