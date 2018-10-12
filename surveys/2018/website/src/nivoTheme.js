import { colors } from './constants'

export default {
    name: 'dark',
    background: '#222',
    experienceColors: [
        colors.red,
        colors.redLight,
        colors.blue,
        colors.blueLight,
        colors.greyLight
    ],
    salaryColors: ['#8b8de8', '#b3b5e6', '#dedfec', '#e4d6d9', '#dc9eaa', '#e28194', '#ea2149'],
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
