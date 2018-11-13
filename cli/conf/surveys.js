const sections = require('./sections')
const experience = require('./experience')

module.exports = [
    {
        id: '2016',
        extractor: 'typeform',
        typeform: {
            id: 'Mulmxw',
        },
        sections: {
            [sections.JAVASCRIPT_FLAVORS]: {
                title: 'JavaScript Flavor',
            },
            [sections.FRONTEND_FRAMEWORKS]: {
                title: 'Front-End',
                freeform: 'Other Front-End Frameworks',
            },
            [sections.STATE_MANAGEMENT]: {
                title: 'State Management',
                freeform: 'Other State Management Libraries',
            },
            [sections.DATA_LAYER]: {
                title: 'API Layer',
                freeform: 'Other API layer solutions',
            },
            [sections.BACKEND_FRAMEWORKS]: {
                title: 'Stacks',
                freeform: 'Other stacks',
            },
            [sections.TESTING]: {
                title: 'Testing',
                freeform: 'Other testing frameworks',
            },
            [sections.CSS]: {
                title: 'CSS',
                freeform: 'Other CSS solutions',
            },
            [sections.BUILD_TOOLS]: {
                title: 'Build Tools',
                freeform: 'Other build tools',
            },
            [sections.MOBILE_DESKTOP]: {
                title: 'Mobile',
                freeform: 'Other mobile apps solutions',
            },
        },
        experience: {
            // "id": "36475866",
            // "ref": "41f66e36c494b3b0",
            // "label": "I've used it before, and would use it again"
            [`I've used it before, and would use it again`]: experience.WOULD_USE,
            // "id": "36475867",
            // "ref": "46ee3398d1102ba3",
            // "label": "I've used it before, and would not use it again"
            [`I've used it before, and would not use it again`]: experience.WOULD_NOT_USE,
            // "id": "36475864",
            // "ref": "861a658ca2aa9061",
            // "label": "I've heard of it, and would like to learn it"
            [`I've heard of it, and would like to learn it`]: experience.INTERESTED,
            // "id": "36475865",
            // "ref": "922f13554ebbe690",
            // "label": "I've heard of it, and am not interested"
            [`I've heard of it, and am not interested`]: experience.NOT_INTERESTED,
            // "id": "36475863",
            // "ref": "39101cc5e2ab0e13",
            // "label": "I've never heard of it"
            [`I've never heard of it`]: experience.NEVER_HEARD,
        },
    },
    {
        id: '2017',
        extractor: 'typeform',
        typeform: {
            id: 'S5iLk9',
        },
        sections: {
            [sections.JAVASCRIPT_FLAVORS]: {
                title: 'JavaScript Flavor',
            },
            [sections.FRONTEND_FRAMEWORKS]: {
                title: 'Front-End',
                freeform: 'Other Front-End Frameworks',
            },
            [sections.DATA_LAYER]: {
                title: 'Data Layer',
                freeform: 'Other Data Management Solutions',
            },
            [sections.BACKEND_FRAMEWORKS]: {
                title: 'Back-End',
                freeform: 'Other Back-End Tools',
            },
            [sections.TESTING]: {
                title: 'Testing',
                freeform: 'Other testing frameworks',
            },
            [sections.CSS]: {
                title: 'CSS',
                freeform: 'Other CSS solutions',
            },
            [sections.BUILD_TOOLS]: {
                title: 'Build Tools',
                freeform: 'Other build tools',
            },
            [sections.MOBILE_DESKTOP]: {
                title: 'Mobile & Desktop',
                freeform: 'Other mobile/desktop apps solutions',
            },
        },
        experience: {
            // "id": "LD42",
            // "ref": "bced803e01c5492e",
            // "label": "I've USED it before, and WOULD use it again"
            [`I've USED it before, and WOULD use it again`]: experience.WOULD_USE,
            // "id": "HH6G",
            // "ref": "f498f4c89a775ee1",
            // "label": "I've USED it before, and would NOT use it again"
            [`I've USED it before, and would NOT use it again`]: experience.WOULD_NOT_USE,
            // "id": "x5Lx",
            // "ref": "290851c7e9e6f9b3",
            // "label": "I've HEARD of it, and WOULD like to learn it"
            [`I've HEARD of it, and WOULD like to learn it`]: experience.INTERESTED,
            // "id": "ahoh",
            // "ref": "15982944e95c3781",
            // "label": "I've HEARD of it, and am NOT interested"
            [`I've HEARD of it, and am NOT interested`]: experience.NOT_INTERESTED,
            // "id": "oHQz",
            // "ref": "65e0ff66df43887d",
            // "label": "I've never heard of it"
            [`I've never heard of it`]: experience.NEVER_HEARD,
        },
    },
    {
        id: '2018',
        extractor: 'typeform',
        typeform: {
            id: 'J9gRJf',
        },
        sections: {
            [sections.JAVASCRIPT_FLAVORS]: {
                title: 'JavaScript Flavors',
                freeform: 'Other JavaScript Flavors options',
            },
            [sections.FRONTEND_FRAMEWORKS]: {
                title: 'Front-End',
                freeform: 'Other Front-End options',
            },
            [sections.DATA_LAYER]: {
                title: 'Data Layer',
                freeform: 'Other Data Layer options',
            },
            [sections.BACKEND_FRAMEWORKS]: {
                title: 'Back-end',
                freeform: 'Other Back-end options',
            },
            [sections.TESTING]: {
                title: 'Testing',
                freeform: 'Other Testing options',
            },
            [sections.MOBILE_DESKTOP]: {
                title: 'Mobile & Desktop',
                freeform: 'Other Mobile & Desktop options',
            },
        },
        experience: {
            // "id": "o61WWiggrPn1",
            // "ref": "reason_would_use_again",
            // "label": "👍 Used it > Would use again"
            [`👍 Used it > Would use again`]: experience.WOULD_USE,
            // "id": "mnDsp0XqjRfw",
            // "ref": "reason_would_not_use_again",
            // "label": "👎 Used it > Would avoid"
            [`👎 Used it > Would avoid`]: experience.WOULD_NOT_USE,
            // "id": "Ct3KLFSwjnlA",
            // "ref": "reason_interested",
            // "label": "✅ Heard of it > Would like to learn"
            [`✅ Heard of it > Would like to learn`]: experience.INTERESTED,
            // "id": "RVn9wTD6cO9S",
            // "ref": "reason_not_interested",
            // "label": "🚫 Heard of it > Not interested"
            [`🚫 Heard of it > Not interested`]: experience.NOT_INTERESTED,
            // "id": "m0FxGuXDhc5A",
            // "ref": "reason_neverheard",
            // "label": "🤷 Never heard of it/Not sure what it is"
            [`🤷 Never heard of it/Not sure what it is`]: experience.NEVER_HEARD,
        },
    },
]