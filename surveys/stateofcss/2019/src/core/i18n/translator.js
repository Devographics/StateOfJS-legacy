import { template } from 'lodash'

export const getTranslator = ({ locale, translations }) => (key, { values } = {}) => {
    const translation = translations.find(t => t.key === key)

    if (translation === undefined) {
        return `[${locale}] ${key}`
    }

    if (values === undefined) return translation.t

    try {
        return template(translation.t)(values)
    } catch (error) {
        // console.error(error)
        return `[${locale}][ERR] ${key}`
    }
}

export const translateOrFallback = (translatedKey, fallback) =>
    translatedKey.match(/\[[a-z]{2}-[A-Z]{2}?\] [a-z_\-.]+/) ? fallback : translatedKey
