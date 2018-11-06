import { colors } from './constants'

export default {
    name: 'dark',
    background: '#222',
    opinionColors: {
        would_use: colors.red,
        would_not_use: colors.redLight,
        interested: colors.blue,
        not_interested: colors.blueLight,
        never_heard: colors.greyLight
    },
    opinionScaleColors: [
        colors.red,
        colors.redLight,
        colors.greyLight,
        colors.blueLight,
        colors.blue
    ],
    salaryColors: ['#8b8de8', '#b3b5e6', '#dedfec', '#e4d6d9', '#dc9eaa', '#e28194', '#ea2149'],
    genderColors: {
        female: colors.blue,
        male: colors.red,
        'non-binary/ third gender': colors.yellow,
        other: colors.greyLight
    },
    reasonsColors: {
        like: colors.blue,
        dislike: colors.red
    },
    axis: {
        domain: {
            line: {
                strokeWidth: 0,
                stroke: '#bbb'
            }
        },
        ticks: {
            line: {
                stroke: '#bbb'
            },
            text: {
                fill: '#bbb'
            }
        },
        legend: {
            text: {
                fill: '#eee',
                fontSize: 12,
                fontWeight: 500
            }
        }
    },
    streamTimelineAxis: {
        ticks: {
            line: {
                strokeWidth: 2,
                stroke: '#e8e8e8'
            },
            text: {
                fontSize: 16,
                fill: '#e8e8e8'
            }
        }
    },
    grid: {
        stroke: '#444',
        line: {
            stroke: '#444'
        }
    },
    legends: {
        text: {
            fontSize: 12,
            fill: '#eee'
        }
    },
    tooltip: {
        container: {
            fontSize: '13px',
            background: '#000',
            color: '#ddd'
        }
    },
    labels: {
        text: {
            fill: '#ddd',
            fontSize: 12,
            fontWeight: 500
        }
    },
    dots: {
        text: {
            fill: '#bbb',
            fontSize: 12
        }
    }
}
