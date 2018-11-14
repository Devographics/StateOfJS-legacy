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
    warmGrey: '#e4d6d9',

    redLighter: '#fbcaca',
    redLight: '#f89f9f',
    red: '#FE6A6A',
    redDark: '#ca4040',
    redDarker: '#a22528',

    blueDark: '#008888',
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

// export const chordScale = [
//     colors.blue,
//     colors.red,
//     colors.blueLight,
//     colors.redLight,
//     colors.blueDark,
//     colors.redDark
// ]

export const chordScale = [
    colors.red,
    colors.red,
    colors.red,
    colors.red,
    colors.red,
    colors.red
]

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
    'would_use',
    'would_not_use',
    'interested',
    'not_interested',
    'never_heard'
]

export const salaryRanges = [
    'work-for-free',
    '0-10',
    '10-30',
    '30-50',
    '50-100',
    '100-200',
    'more-than-200'
]

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

export const DIVERGENCE_MAX_OFFSET = 15
export const DIVERGENCE_COLORS = ['#8b8de8', '#dadada', '#ea2149']

export const globalOpinionSubjects = [
    'js_moving_in_right_direction',
    'building_js_apps_overly_complex',
    'js_over_used_online',
    'enjoy_building_js_apps',
    'would_like_js_to_be_main_lang',
    'js_ecosystem_changing_to_fast',
    'survey_too_long'
]

export const reasons = {
    like: [
        'elegant_programming_style_patterns',
        'robust_less_error_prone_code',
        'rich_package_ecosystem',
        'fast_performance',
        'well_established_option',
        'easy_learning_curve',
        'powerful_developer_tooling',
        'good_documentation',
        'backed_by_a_great_team_company',
        'simple_lightweight',
        'growing_momentum_popularity',
        'full_featured_powerful',
        'stable_backwards_compatible',
        'other'
    ],
    dislike: [
        'clumsy_programming_style',
        'buggy_error_prone_code',
        'poor_performance',
        'small_package_ecosystem',
        'new_untested_option',
        'hard_learning_curve',
        'lacking_developer_tooling',
        'bad_documentation',
        'concerns_about_the_team_company',
        'bloated_complex',
        'diminishing_momentum_popularity',
        'limited_lacking_in_features',
        'fast_changing_breaks_often',
        'other'
    ]
}

export const verticalMargin = 30
export const innerMargin = 10
export const barHeight = 30
export const labelsWidth = 150

export const barChartProps = {
    layout: 'horizontal',
    enableGridX: true,
    enableGridY: false,
    enableLabel: false,
    reverse: false,
    enableLabels: false,
    padding: 0.8,
    borderRadius: 2.5,
    margin: {
        top: verticalMargin,
        right: innerMargin,
        bottom: verticalMargin,
        left: labelsWidth
    },
    axisTop: {
        format: '.2s'
    }
}
