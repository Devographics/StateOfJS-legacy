export const colors = {
    purpleLight: '#b4addc',
    purple: '#9688e4',
    purpleDark: '#786bc3',
    otherPurple: '#4500EE',

    yellowLight: '#fffec7',
    yellow: '#fbf34c',
    yellowDark: '#d2b924',

    greyLight: '#d8d8d8',
    greyDark: '#aeaeae',

    redLight: '#f89f9f',
    red: '#FE6A6A',
    redDark: '#ca4040',

    blue: '#41c7c7',
    blueLight: '#8be7e7'
}

export const colorRange = [
    colors.red,
    colors.redLight,
    colors.blue,
    colors.blueLight,
    colors.greyLight
]

export const sectionColors = {
    flavors: 'red',
    frontend: '#7D7494',
    state: '#FBF34C',
    backend: '#49B7BE',
    testing: '#84E56C',
    style: '#E0A4BC',
    build: '#D96A2B',
    mobile: '#8B8DE8'
}

export const chordScale = ['#b3b5e6', '#e28194', '#788080']

export const colorScale = [
    '#41c7c7',
    '#8be7e7',
    '#dedfec',
    '#e4d6d9',
    '#f89f9f',
    '#FE6A6A',
    '#ca4040'
]

export const toolOpinionKeys = [
    'never_heard',
    'not_interested',
    'would_learn',
    'would_not_use',
    'would_use'
]

export const experience = {
    never_heard: `I've never heard of it`,
    not_interested: `I've HEARD of it, and am NOT interested`,
    would_learn: `I've HEARD of it, and WOULD like to learn it`,
    would_use: `I've USED it before, and WOULD use it again`,
    would_not_use: `I've USED it before, and would NOT use it again`
}

export const experienceKeys = [
    `I've never heard of it`,
    `I've HEARD of it, and am NOT interested`,
    `I've HEARD of it, and WOULD like to learn it`,
    `I've USED it before, and WOULD use it again`,
    `I've USED it before, and would NOT use it again`
]

export const experienceColors = {
    "I've never heard of it": colors.greyLight,
    "I've HEARD of it, and WOULD like to learn it": colors.blue,
    "I've HEARD of it, and am NOT interested": colors.blueLight,
    "I've USED it before, and WOULD use it again": colors.red,
    "I've USED it before, and would NOT use it again": colors.redLight
}

export const experienceInterestKeys = [
    `I've HEARD of it, and WOULD like to learn it`,
    `I've HEARD of it, and am NOT interested`
]

export const experienceSatisfactionKeys = [
    `I've USED it before, and WOULD use it again`,
    `I've USED it before, and would NOT use it again`
]

export const salaryKeys = [
    'I work for free :(',
    '$0-$10k',
    '$10-$30k',
    '$30-50k',
    '$50-$100k',
    '$100k-$200k',
    '$200k+'
]

export const salaryShortKeys = {
    'I work for free :(': 'free',
    '$0-$10k': '0~10k',
    '$10-$30k': '10~30k',
    '$30-50k': '30~50k',
    '$50-$100k': '50~100k',
    '$100k-$200k': '100~200k',
    '$200k+': '>200k'
}

export const yearsOfExperienceKeys = [
    'Less than one year',
    '1-2 years',
    '2-5 years',
    '5-10 years',
    '10-20 years',
    '20+ years'
]

export const yearsOfExperienceShortKeys = {
    'Less than one year': '<1',
    '1-2 years': '1~2',
    '2-5 years': '2~5',
    '5-10 years': '5~10',
    '10-20 years': '10~20',
    '20+ years': '>20'
}

export const featureKeys = [
    "I don't know what that is",
    'Not needed',
    'Nice-to-have, but not important',
    'Major feature',
    'Vital feature'
]

export const featureColors = {
    "I don't know what that is": colors.purple,
    'Not needed': colors.purple,
    'Nice-to-have, but not important': colors.purple,
    'Major feature': colors.purple,
    'Vital feature': colors.purple
}

export const opinionKeys = ['0', '1', '2', '3', '4']

export const opinionLabels = ['Disagree', '', 'Neutral', '', 'Agree']

export const opinionColors = {
    0: colors.purple,
    1: colors.purple,
    2: colors.purple,
    3: colors.purple,
    4: colors.purple
}

export const aliases = {
    Vue: 'Vue.JS',
    Angular: 'Angular 1',
    'No Front-End Framework': 'No Framework'
}

export const DIVERGENCE_MAX_OFFSET = 15
export const DIVERGENCE_COLORS = ['#8b8de8', '#dadada', '#ea2149']

export const reasons = {
    like: [
        {
            id: 'elegant_programming_style_patterns',
            label: '⚙️ Elegant programming style & patterns'
        },
        {
            id: 'robust_less_error_prone_code',
            label: '🐞 Robust, less error-prone code'
        },
        {
            id: 'rich_package_ecosystem',
            label: '🎁 Rich package ecosystem'
        },
        {
            id: 'fast_performance',
            label: '⚡ Fast performance'
        },
        {
            id: 'well_established_option',
            label: '🏛️ Well-established option'
        },
        {
            id: 'easy_learning_curve',
            label: '👶 Easy learning curve'
        },
        {
            id: 'powerful_developer_tooling',
            label: '🔧 Powerful developer tooling'
        },
        {
            id: 'good_documentation',
            label: '📖 Good documentation'
        },
        {
            id: 'backed_by_a_great_team_company',
            label: '👫 Backed by a great team/company'
        },
        {
            id: 'simple_lightweight',
            label: '🎈 Simple & lightweight'
        },
        {
            id: 'growing_momentum_popularity',
            label: '📉 Growing momentum/popularity'
        },
        {
            id: 'full_featured_powerful',
            label: '🕹️ Full-featured & powerful'
        },
        {
            id: 'stable_backwards_compatible',
            label: '⚖️ Stable & backwards-compatible'
        },
        {
            id: 'other',
            label: 'Other'
        }
    ],
    dislike: [
        {
            id: 'clumsy_programming_style',
            label: 'Clumsy programming style ⚙️'
        },
        {
            id: 'buggy_error_prone_code',
            label: 'Buggy, error-prone code 🐞'
        },
        {
            id: 'poor_performance',
            label: 'Poor performance ⚡'
        },
        {
            id: 'small_package_ecosystem',
            label: 'Small package ecosystem 🎁'
        },
        {
            id: 'new_untested_option',
            label: 'New untested option 🏛️'
        },
        {
            id: 'hard_learning_curve',
            label: 'Hard learning curve 👶'
        },
        {
            id: 'lacking_developer_tooling',
            label: 'Lacking developer tooling 🔧'
        },
        {
            id: 'bad_documentation',
            label: 'Bad documentation 📖'
        },
        {
            id: 'concerns_about_the_team_company',
            label: 'Concerns about the team/company 👫'
        },
        {
            id: 'bloated_complex',
            label: 'Bloated & complex 🎈'
        },
        {
            id: 'diminishing_momentum_popularity',
            label: 'Diminishing momentum/popularity 📉'
        },
        {
            id: 'limited_lacking_in_features',
            label: 'Limited & lacking in features 🕹️'
        },
        {
            id: 'fast_changing_breaks_often',
            label: 'Fast-changing & breaks often ⚖️'
        },
        {
            id: 'other',
            label: 'Other'
        }
    ]
}
