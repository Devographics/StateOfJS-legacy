import { colors } from './constants'

export default {
    name: 'state_of_css_2019',
    background: '#d9dedf',
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
    sourceColors: {
        Email: colors.purple,
        Twitter: colors.blue,
        Reddit: colors.red,
        Slack: 'rgb(110, 93, 133)',
        'JavaScript Weekly': colors.yellow,
        'Hacker News': 'rgb(240, 128, 72)',
        Medium: '#48A57F',
        Facebook: 'rgb(99, 130, 197)',
        'Other/Unknown': colors.greyLight
    },
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
                fill: colors.blue,
                fontSize: 13
            }
        },
        legend: {
            text: {
                fill: colors.blue,
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
        stroke: '#A2C7CE',
        line: {
            stroke: '#A2C7CE'
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
            fontSize: 13,
            background: '#000',
            color: '#ddd'
        }
    },
    labels: {
        text: {
            fill: '#ddd',
            fontSize: 12,
            fontWeight: 500,
            fontFamily: `'IBM Plex Mono', 'Space Grotesk', 'Roboto Slab', sans-serif`
        }
    },
    dots: {
        text: {
            fill: '#bbb',
            fontSize: 12
        }
    }
}
