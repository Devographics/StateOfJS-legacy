export const colors = {
    purpleLight: '#b4addc',
    purple: '#9688e4',
    purpleDark: '#786bc3',

    yellowLight: '#fffec7',
    yellow: '#fbf34c',
    yellowDark: '#d2b924',

    greyLight: '#d8d8d8',
    greyDark: '#aeaeae',
}

export const colorRange = [
    colors.purple,
    colors.purpleLight,
    colors.yellow,
    colors.yellowLight,
    colors.greyLight,
]

export const colorScale = ['#8b8de8', '#b3b5e6', '#dedfec', '#e4d6d9', '#dc9eaa', '#e28194', '#ea2149'];

export const experience = {
    never_heard: `I've never heard of it`,
    not_interested: `I've HEARD of it, and am NOT interested`,
    would_learn: `I've HEARD of it, and WOULD like to learn it`,
    would_use: `I've USED it before, and WOULD use it again`,
    would_not_use: `I've USED it before, and would NOT use it again`,
}

export const experienceKeys = [
    `I've never heard of it`,
    `I've HEARD of it, and am NOT interested`,
    `I've HEARD of it, and WOULD like to learn it`,
    `I've USED it before, and WOULD use it again`,
    `I've USED it before, and would NOT use it again`,
]

export const experienceColors = {
    "I've never heard of it": colors.greyLight,
    "I've HEARD of it, and am NOT interested": colors.yellowLight,
    "I've HEARD of it, and WOULD like to learn it": colors.yellow,
    "I've USED it before, and WOULD use it again": colors.purple,
    "I've USED it before, and would NOT use it again": colors.purpleLight,
}

export const experienceInterestKeys = [
    `I've HEARD of it, and WOULD like to learn it`,
    `I've HEARD of it, and am NOT interested`,
]

export const experienceSatisfactionKeys = [
    `I've USED it before, and WOULD use it again`,
    `I've USED it before, and would NOT use it again`,
]

export const salaryKeys = [
    'I work for free :(',
    '$0-$10k',
    '$10-$30k',
    '$30-50k',
    '$50-$100k',
    '$100k-$200k',
    '$200k+',
]

export const salaryShortKeys = {
    'I work for free :(': 'free',
    '$0-$10k': '0~10k',
    '$10-$30k': '10~30k',
    '$30-50k': '30~50k',
    '$50-$100k': '50~100k',
    '$100k-$200k': '100~200k',
    '$200k+': '>200k',
}

export const yearsOfExperienceKeys = [
    'Less than one year',
    '1-2 years',
    '2-5 years',
    '5-10 years',
    '10-20 years',
    '20+ years',
]

export const yearsOfExperienceShortKeys = {
    'Less than one year': '<1',
    '1-2 years': '1~2',
    '2-5 years': '2~5',
    '5-10 years': '5~10',
    '10-20 years': '10~20',
    '20+ years': '>20',
}

export const featureKeys = [
    "I don't know what that is",
    'Not needed',
    'Nice-to-have, but not important',
    'Major feature',
    'Vital feature',
]

export const featureColors = {
    "I don't know what that is": '#bab3ff',
    'Not needed': '#aa9cf8',
    'Nice-to-have, but not important': '#a193f0',
    'Major feature': '#9688e4',
    'Vital feature': '#7d70c7',
}

export const aliases = {
    Vue: 'Vue.JS',
    Angular: 'Angular 1',
    'No Front-End Framework': 'No Framework',
}