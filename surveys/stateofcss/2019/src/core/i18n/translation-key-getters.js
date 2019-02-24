const keyFrom = name => name.replace(/ |-|\/|\./g, '_').toLowerCase()

export const countryNameToTranslationKey = name => `countries.${keyFrom(name)}`

export const genderNameToTranslationKey = name => `genders.${keyFrom(name)}`

export const sourceNameToTranslationKey = name => `sources.${keyFrom(name)}`

export const libraryDescriptionToTranslationKey = name => `library.descriptions.${keyFrom(name)}`
