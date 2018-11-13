import React, { Component } from 'react'
import PeriodicElement from './PeriodicElement'
import Link from 'gatsby-link'

/*

Config: 

- elementSize:          Size of an individual element tile
- interval:             How often the animation's tick should be updated (in ms). 
                        Lower values will results in faster animations
- velocity:             How fast the elements move (higher = faster)
- frictionCoefficient:  How fast the elements slow down after a boost (lower = stronger friction)
- initialMultiplier:    How much to accelerate elements after a boost (higher = faster)
- velocityVariance:     How much initial velocities can vary (higher = more variance)

*/
const maxSize = 100
const interval = 10
const velocity = 1.1
const returnVelocity = 10 // lower = faster
const frictionCoefficient = 2.5 // lower = stronger friction
const initialMultiplier = 10 // higher = faster
const velocityVariance = 1.1
const buttonWidth = 200
const buttonHeight = 80

// https://stackoverflow.com/a/18358056/649299
function roundToTwo(num) {
    return +(Math.round(num + 'e+2') + 'e-2')
}
/*

Note: x and y coordinates are plotted on a 5 by 3 grid

*/
const fullLogo = [
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

const simpleLogo = [
    {
        x: 0,
        y: 0,
        symbol: 'St',
        number: 1
    },
    {
        x: 1,
        y: 0,
        symbol: 'Js',
        number: 2
    },
    {
        x: 2,
        y: 0,
        symbol: '20',
        number: 3
    },
    {
        x: 4,
        y: 0,
        symbol: '18',
        number: 4
    }
]

const getRandomAngle = () => {
    return Math.round(Math.random() * 360)
}

class Animation extends Component {
    state = {
        t: 0,
        ready: false,
        stopped: false
    }

    getLogoElements = () => {
        const { variant = 'full' } = this.props
        return variant === 'full' ? fullLogo : simpleLogo
    }

    getOrigin = (height, width) => {
        const { variant = 'full' } = this.props
        const size = this.getSize(width)
        const topLeft = { x: 1, y: 1 }
        const center = {
            x: width / 2 - (size * 5) / 2,
            y: height / 2 - (size * 3) / 2
        }
        return variant === 'full' ? center : topLeft
    }

    /*

    For full logo, calculate ideal size for a single element
    Size = usable area / 5 (since the grid is 5 elements wide)

    */
    getSize = (width) => {
        const { size } = this.props
        if (size) {
            // size is fixed
            return size
        } else {
            const padding = 20
            const dynamicSize = (width - padding * 2) / 5
            return Math.min(dynamicSize, maxSize)
        }
    }

    /*

    Get initial positions given the container's height and width

    */
    getInitPositions = (height, width) => {
        const positions = {}
        const origin = this.getOrigin(height, width)
        const size = this.getSize(width)

        this.getLogoElements().forEach(({ x, y, symbol }) => {
            positions[symbol] = {
                x: origin.x + x * size,
                y: origin.y + y * size,
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
        const randomVelocity = velocity + roundToTwo(Math.random() * velocityVariance)
        const baseXSpeed = roundToTwo(Math.cos(angle) * randomVelocity)
        const baseYSpeed = roundToTwo(Math.sin(angle) * randomVelocity)
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
        const size = this.getSize(width)
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

                Note: friction is squared or cubed to emphasize the decceleration
                
                */
                const friction = Math.pow(frictionCoefficient, 3)
                let xSpeedDelta = roundToTwo((xSpeed - baseXSpeed) / friction)
                let ySpeedDelta = roundToTwo((ySpeed - baseYSpeed) / friction)
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
                if (x <= 0 || x >= width - size) {
                    xSpeed = -xSpeed
                    baseXSpeed = -baseXSpeed
                }
                if (y <= 0 || y >= height - size) {
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
        const { variant = 'full' } = this.props
        const { positions, height, width, ready } = this.state
        const size = width && this.getSize(width)
        return (
            <div
                className={`LogoAnimation__Wrapper LogoAnimation__Wrapper--${variant}`}
                id="LogoAnimation__Wrapper"
                style={{ height: '100vh', width: '100%' }}
            >
                {/* {variant === 'full' && (
                    <div className="LogoAnimation__Inner">
                        <Link
                            onMouseEnter={this.stopAnimation}
                            onMouseLeave={this.restartAnimation}
                            className="LogoAnimation__Button button"
                            to="/introduction"
                        >
                            Start
                        </Link>
                    </div>
                )} */}
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
                        {this.getLogoElements().map(({ symbol, number }, i) => (
                            <PeriodicElement
                                key={symbol}
                                number={number || i}
                                className={`LogoAnimation__Element LogoAnimation__Element--${symbol}`}
                                x={positions[symbol].x}
                                y={positions[symbol].y}
                                symbol={symbol}
                                // name={`${roundToTwo(positions[symbol].xSpeed)}, ${roundToTwo(positions[symbol].ySpeed)}`}
                                size={size}
                            />
                        ))}
                        <foreignObject
                            x={width / 2 - (size * 3) / 2}
                            y={height / 2 + (size * 3) / 2 + 40}
                            width={size * 3}
                            height={size}
                        >
                            <Link
                                onMouseEnter={this.stopAnimation}
                                onMouseLeave={this.restartAnimation}
                                className="LogoAnimation__Button button"
                                to="/introduction"
                            >
                                <span>Start</span>
                            </Link>
                        </foreignObject>
                    </svg>
                )}
            </div>
        )
    }
}
export default Animation
