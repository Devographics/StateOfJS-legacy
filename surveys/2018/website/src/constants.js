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

    red: '#FE6A6A',
    redLight: '#f89f9f',

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
