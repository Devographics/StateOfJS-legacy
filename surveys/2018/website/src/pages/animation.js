import React, { Component } from 'react'
import PeriodicElement from '../components/elements/PeriodicElement'

/*

Config: 

- elementSize:          Size of an individual element tile
- interval:             How often the animation's tick should be updated (in ms). 
                        Lower values will results in faster animations
- velocity:             How fast the elements move (higher = faster)
- frictionCoefficient:  How fast the elements slow down after a boost (lower = stronger friction)
- initialMultiplier:    How much to accelerate elements after a boost (higher = faster)

*/
const elementSize = 100
const interval = 10
const velocity = 1.4
const returnVelocity = 10 // lower = faster
const frictionCoefficient = 5 // lower = stronger friction
const initialMultiplier = 10 // higher = faster

const keep2Decimals = x => Math.round(x * 100) / 100

/*

Note: x and y coordinates are plotted on a 5 by 3 grid

*/
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

    /*

    Get initial positions given the container's height and width

    */
    getInitPositions = (height, width) => {
        const positions = {}
        const origin = {
            x: width / 2 - (elementSize * 5) / 2,
            y: height / 2 - (elementSize * 3) / 2
        }
        logoElements.forEach(({ x, y, symbol }) => {
            positions[symbol] = {
                x: origin.x + x * elementSize,
                y: origin.y + y * elementSize,
                ...this.getAngle()
            }
        })
        return positions
    }

    /*

    Get a random angle along with x and y velocities
    (add multiplier which will then get scaled down to simulate friction)

    */
    getAngle = () => {
        const angle = getRandomAngle()
        const baseXSpeed = keep2Decimals(Math.cos(angle) * velocity)
        const baseYSpeed = keep2Decimals(Math.sin(angle) * velocity)
        return {
            angle,
            baseXSpeed,
            baseYSpeed,
            xSpeed: baseXSpeed * initialMultiplier,
            ySpeed: baseYSpeed * initialMultiplier
        }
    }

    /*

    Reset all angles and velocities to new random values

    */
    resetAngles = positions => {
        const newPositions = {}
        Object.keys(positions).forEach(symbol => {
            newPositions[symbol] = {
                ...positions[symbol],
                ...this.getAngle()
            }
        })
        return newPositions
    }

    /*

    Compute latest positions

    */
    computePositions = positions => {
        const { height, width, initPositions, stopped } = this.state
        const newPositions = {}
        Object.keys(positions).forEach(symbol => {
            let { x, y, xSpeed, ySpeed, angle, baseXSpeed, baseYSpeed } = positions[symbol]
            if (stopped) {
                /*

                The animation is stopped, return to original positions

                */
                xSpeed = (initPositions[symbol].x - x) / returnVelocity
                ySpeed = (initPositions[symbol].y - y) / returnVelocity
            } else {
                /*

                The animation is live, bounce around

                */
                /*

                Calculate difference between current velocity and target velocity and
                then divide that by friction coefficient to get velocity delta

                */
                let xSpeedDelta = keep2Decimals((xSpeed - baseXSpeed) / frictionCoefficient)
                let ySpeedDelta = keep2Decimals((ySpeed - baseYSpeed) / frictionCoefficient)
                /*

                If delta gets too low, stop calculating it

                */
                if (Math.abs(xSpeedDelta) < 0.01) xSpeedDelta = 0
                if (Math.abs(ySpeedDelta) < 0.01) ySpeedDelta = 0
                /*

                Take out delta from directional speed to slow down movement

                */
                xSpeed -= xSpeedDelta
                ySpeed -= ySpeedDelta

                /*

                Bounce at the edges.
                
                Note: we also reverse the base speed to avoid messing up the delta calculations above

                */
                if (x <= 0 + elementSize || x >= width - elementSize) {
                    xSpeed = -xSpeed
                    baseXSpeed = -baseXSpeed
                }
                if (y <= 0 + elementSize || y >= height - elementSize) {
                    ySpeed = -ySpeed
                    baseYSpeed = -baseYSpeed
                }
            }
            x += xSpeed
            y += ySpeed
            newPositions[symbol] = { baseXSpeed, baseYSpeed, x, y, xSpeed, ySpeed, angle }
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
            positions: this.resetAngles(positions)
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
                        {logoElements.map(({ symbol }, i) => (
                            <PeriodicElement
                                key={symbol}
                                number={i}
                                className={`LogoAnimation__Element LogoAnimation__Element--${symbol}`}
                                x={positions[symbol].x}
                                y={positions[symbol].y}
                                symbol={symbol}
                                // name={`${keep2Decimals(positions[symbol].xSpeed)}, ${keep2Decimals(positions[symbol].ySpeed)}`}
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
