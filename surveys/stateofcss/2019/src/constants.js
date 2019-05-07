export let colors = {
    greyLight: '#e0e4e4',
    grey: '#d9dedf',
    greyMedium: '#cecdcc',

    blueLighter: '#B2BBEE',
    blueLight: '#808EE1',
    blue: '#3c52d1',
    blueDark: '#273aa2',

    pinkLightest: '#D3BBF2',
    pinkLighter: '#D68DF0',
    pinkLight: '#EC75CB',
    pink: '#ec2f95',

    tealLight: '#bad9db',
    teal: '#9ac6c9',
    tealDark: '#445a5a',

    purple: '#9688e4',
    red: '#FE6A6A',
    yellow: '#fbf34c',
    aqua: '#1ea0f2'
}

export const colorRange = [
    colors.blueDark,
    colors.blue,
    colors.blueLight,
    colors.blueLighter,
    colors.pinkLightest,
    colors.pinkLighter,
    colors.pinkLight,
    colors.pink
]

export const pinkRange = [colors.pinkLightest, colors.pinkLighter, colors.pinkLight, colors.pink]
export const blueRange = [colors.blueLighter, colors.blueLight, colors.blue, colors.blueDark]

export const colorScale = [
    '#41c7c7',
    '#8be7e7',
    '#dedfec',
    '#e4d6d9',
    '#f89f9f',
    '#FE6A6A',
    '#ca4040'
]

export const keys = {
    salary: ['work-for-free', '0-10', '10-30', '30-50', '50-100', '100-200', 'more-than-200'],
    'company-size': ['1', '1-5', '5-10', '10-20', '20-50', '50-100', '100-1000', 'more-than-1000'],
    'years-of-experience': ['less-than-1', '1-2', '2-5', '5-10', '10-20', 'more-than-20']
}

export const usage = [
    {
        id: 'used_it',
        raw: `👍 I've used it`,
        color: colors.blue
    },
    {
        id: 'know_not_used',
        raw: `✅ Know what it is, but haven't used it`,
        color: colors.teal
    },
    {
        id: 'never_heard_not_sure',
        raw: `🤷 Never heard of it/Not sure what it is`,
        color: colors.greyMedium
    }
]

export const opinions = [
    {
        id: 'would_use',
        raw: `👍 Used it > Would use again`,
        color: colors.blue
    },
    {
        id: 'would_not_use',
        raw: `👎 Used it > Would avoid`,
        color: colors.blueLight
    },
    {
        id: 'interested',
        raw: `✅ Heard of it > Would like to learn`,
        color: colors.teal
    },
    {
        id: 'not_interested',
        raw: `🚫 Heard of it > Not interested`,
        color: colors.tealLight
    },
    {
        id: 'never_heard',
        raw: '🤷 Never heard of it/Not sure what it is',
        color: colors.greyMedium
    }
]

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

export const fontFamily = `'IBM Plex Mono', monospace`
