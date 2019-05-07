import { colors, colorRange, fontFamily } from './constants'

export default {
    name: 'state_of_css_2019',
    // background: '#ffffff',
    opinionColors: {
        would_use: colors.pink,
        would_not_use: colors.pinkLight,
        interested: colors.blue,
        not_interested: colors.blueDark,
        never_heard: colors.greyLight
    },
    opinionScaleColors: colorRange,
    salaryColors: colorRange,
    sourceColors: {
        Email: colors.teal,
        Twitter: colors.aqua,
        Reddit: colors.red,
        Slack: 'rgb(110, 93, 133)',
        'JavaScript Weekly': colors.yellow,
        'Hacker News': 'rgb(240, 128, 72)',
        Medium: '#48A57F',
        Facebook: 'rgb(99, 130, 197)',
        'Other/Unknown': colors.greyMedium
    },
    genderColors: {
        female: colors.blueLight,
        male: colors.teal,
        'non-binary/ third gender': colors.yellow,
        other: colors.greyMedium
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
                stroke: colors.teal
            },
            text: {
                fill: colors.blue,
                fontSize: 12
            }
        },
        legend: {
            text: {
                fill: colors.blue,
                fontSize: 14,
                fontWeight: 600
            }
        }
    },
    grid: {
        line: {
            stroke: colors.teal,
            strokeDasharray: '1 2'
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
    legends: {
        text: {
            fontSize: 12,
            fill: '#eee'
        }
    },
    tooltip: {
        container: {
            fontSize: 14,
            background: '#ffffff',
            color: colors.blue,
            borderRadius: 0,
            boxShadow: `0 5px 9px rgba(0, 0, 0, 0.2)`
        }
    },
    labels: {
        text: {
            fill: '#ddd',
            fontSize: 12,
            fontWeight: 500,
            fontFamily
        }
    },
    dots: {
        text: {
            fill: '#bbb',
            fontSize: 12
        }
    }
}
