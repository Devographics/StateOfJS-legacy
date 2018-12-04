import replaceAll from './replaceAll'

const slugify = (s, dashToUnderscore = false) => {
    const slug = replaceAll(s.toLowerCase(), ' ', '-')
    const slugUnderscore = replaceAll(slug, '-', '_')
    return dashToUnderscore ? slugUnderscore : slug
}

export default slugify
