import React, { Component } from 'react'
import PeriodicElement from '../components/elements/PeriodicElement'

const elementSize = 100
const interval = 10 // lower = faster
const velocity = 1.4 // higher = faster
const returnVelocity = 10 // lower = faster

const logoElements = [
    {
        x: 0,
        y: 0,
        symbol: 'St'
    },
    {
        x: 1,
        y: 0,
        symbol: 'At'
    },
    {
        x: 2,
        y: 0,
        symbol: 'E'
    },
    {
        x: 4,
        y: 0,
        symbol: 'Of'
    },
    {
        x: 0,
        y: 1,
        symbol: 'Ja'
    },
    {
        x: 1,
        y: 1,
        symbol: 'Va'
    },
    {
        x: 2,
        y: 1,
        symbol: 'Sc'
    },
    {
        x: 3,
        y: 1,
        symbol: 'Ri'
    },
    {
        x: 4,
        y: 1,
        symbol: 'Pt'
    },
    {
        x: 2,
        y: 2,
        symbol: '20'
    },
    {
        x: 3,
        y: 2,
        symbol: '18'
    }
]

const getRandomAngle = () => {
    return Math.round(Math.random() * 360)
}

class Home extends Component {
    state = {
        t: 0,
        ready: false,
        stopped: false
    }

    getInitPositions = (height, width) => {
        const positions = {}
        const origin = {
            x: width / 2 - (elementSize * 5) / 2,
            y: height / 2 - (elementSize * 3) / 2
        }
        logoElements.forEach(({ x, y, symbol }) => {
            const angle = getRandomAngle()
            positions[symbol] = {
                x: origin.x + x * elementSize,
                y: origin.y + y * elementSize,
                angle,
                xSpeed: Math.cos(angle) * velocity,
                ySpeed: Math.sin(angle) * velocity
            }
        })
        return positions
    }

    getRandomAngles = positions => {
        const newPositions = {}
        Object.keys(positions).forEach(symbol => {
            const angle = getRandomAngle()
            newPositions[symbol] = {
                ...positions[symbol],
                angle,
                xSpeed: Math.cos(angle) * velocity,
                ySpeed: Math.sin(angle) * velocity
            }
        })
        return newPositions
    }

    computePositions = positions => {
        const { height, width, initPositions, stopped } = this.state
        const newPositions = {}
        Object.keys(positions).forEach(symbol => {
            let { x, y, xSpeed, ySpeed, angle } = positions[symbol]
            if (stopped) {
                xSpeed = (initPositions[symbol].x - x) / returnVelocity
                ySpeed = (initPositions[symbol].y - y) / returnVelocity
            } else {
                if (x <= 0 + elementSize || x >= width - elementSize) {
                    xSpeed = -xSpeed
                }
                if (y <= 0 + elementSize || y >= height - elementSize) {
                    ySpeed = -ySpeed
                }
            }
            x += xSpeed
            y += ySpeed
            newPositions[symbol] = { x, y, xSpeed, ySpeed, angle }
        })
        return newPositions
    }

    componentDidMount() {
        const element = document.getElementById('LogoAnimation__Wrapper')
        const height = element.clientHeight
        const width = element.clientWidth
        const initPositions = this.getInitPositions(height, width)
        this.setState({
            height,
            width,
            initPositions,
            positions: initPositions,
            ready: true
        })

        setInterval(() => {
            this.setState(({ positions }) => {
                return {
                    positions: this.computePositions(positions)
                }
            })
        }, interval)
    }

    stopAnimation = () => {
        this.setState(() => ({
            stopped: true
        }))
    }

    restartAnimation = () => {
        this.setState(({ positions }) => ({
            stopped: false,
            positions: this.getRandomAngles(positions)
        }))
    }

    render() {
        const { initPositions, positions, height, width, ready, stopped } = this.state
        return (
            <div className="LogoAnimation__Wrapper" id="LogoAnimation__Wrapper">
                <div className="LogoAnimation__Inner">
                    <a
                        onMouseEnter={this.stopAnimation}
                        onMouseLeave={this.restartAnimation}
                        className="LogoAnimation__Button button"
                    >
                        Start
                    </a>
                </div>
                {ready && (
                    <svg
                        className="LogoAnimation"
                        id="LogoAnimation"
                        width={width}
                        height={height}
                        viewBox={`0 0 ${width} ${height}`}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {logoElements.map(({ symbol }) => (
                            <PeriodicElement
                                key={symbol}
                                className={`LogoAnimation__Element LogoAnimation__Element--${symbol}`}
                                x={positions[symbol].x}
                                y={positions[symbol].y}
                                symbol={symbol}
                                // name={positions[symbol].angle}
                                number={null}
                                size={elementSize}
                            />
                        ))}
                    </svg>
                )}
            </div>
        )
    }
}
export default Home
