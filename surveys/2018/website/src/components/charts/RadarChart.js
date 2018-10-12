import React from 'react'
import PropTypes from 'prop-types'

// const chartBackgroundColor = '#41C7C7'
const chartBackgroundColor = '#fe6a6a'
const chartMainColor = '#E8E8E8'
const width = 400
const height = 300
const padding = 60
const paddingRight = 50 // extra padding to accomodate labels
const internalPadding = 10
const minRadius = 5
const maxRadius = 20
/*

u: usage (0 to n, in thousands of users)
s: satisfaction (0 to 100)
i: interest ratio (0 to 100)

*/
const data = [
    { u: 3.4, s: 50, i: 81, label: 'React'},
    { u: 1.1, s: 30, i: 37, label: 'Vue.js'},
    { u: 0.78, s: 20, i: 2, label: 'Angular'},
]

const getHighestUsage = data => Math.max.apply(null, data.map(p => p.u))

const convertPoint = point => {
    const restrictedWidth = width - internalPadding*2
    const restrictedHeight = height - internalPadding*2
    const highestUsage = getHighestUsage(data)
    point.x = padding + internalPadding + (point.u * restrictedWidth)/highestUsage
    point.y = padding + internalPadding + (point.s * restrictedHeight)/100
    point.labelY = point.y
    point.r = point.i*(maxRadius-minRadius)/100 + minRadius
    point.labelX = point.x + point.r + 5
    return point
}

const RadarChart = ({ score }) => (
    <div className="radar__wrapper">
        <div className="radar__chart">
            <svg
                width="100%"
                viewBox={`0 0 ${width + padding*2 + paddingRight} ${height + padding*2}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >

                {/* quadrants */}
                <rect x={padding + 1} y={padding} width={width/2} height={height/2} fill={chartBackgroundColor} fillOpacity="0.5" />
                <rect x={width/2 + padding + 1} y={padding} width={width/2} height={height/2} fill={chartBackgroundColor} />
                <rect x={padding + 1} y={height/2 + padding} width={width/2} height={height/2} fill={chartBackgroundColor} fillOpacity="0.2" />
                <rect x={width/2 + padding + 1} y={height/2 + padding} width={width/2} height={height/2} fill={chartBackgroundColor} fillOpacity="0.5" />
                
                {/* quadrant labels */}
                <text textAnchor="middle" alignmentBaseline="middle" x={width*0.25 + padding} y={height*0.25 + padding} fill={chartMainColor} className="radar__chart__quadrant" fillOpacity="0.6">Assess</text>
                <text textAnchor="middle" alignmentBaseline="middle" x={width*0.25 + padding} y={height*0.75 + padding} fill={chartMainColor} className="radar__chart__quadrant" fillOpacity="0.6">Avoid</text>
                <text textAnchor="middle" alignmentBaseline="middle" x={width*0.75 + padding} y={height*0.25 + padding} fill={chartMainColor} className="radar__chart__quadrant" fillOpacity="0.9">Adopt</text>
                <text textAnchor="middle" alignmentBaseline="middle" x={width*0.75 + padding} y={height*0.75 + padding} fill={chartMainColor} className="radar__chart__quadrant" fillOpacity="0.6">Analyze</text>

                {/* points */}
                {data.map(convertPoint).map(({ x, y, r, label, labelX, labelY}, i) => 
                    <React.Fragment key={i}>
                        <circle cx={x} cy={y} r={r} fill={chartMainColor} fillOpacity="1" />
                        <text alignmentBaseline="central" x={labelX} y={labelY} fill={chartMainColor} className="radar__chart__label">{label}</text>
                    </React.Fragment>
                )}

                {/* ticks */}
                {Array.from(Array(11).keys()).map(i => 
                    <React.Fragment key={i}>
                        <rect x={padding - 5} y={padding + height*i/10} width="10" height="2" fill={chartMainColor} />
                        <text x={padding - 20} y={padding + height*i/10} textAnchor="middle" alignmentBaseline="middle" fill={chartMainColor} className="radar__chart__ticklabel">{`${(10-i)*10}%`}</text>
                        <rect x={padding + width*i/10} y={padding + height -5} width="2" height="10" fill={chartMainColor} />
                        <text x={padding + width*i/10} y={padding + height + 20} textAnchor="middle" alignmentBaseline="middle" fill={chartMainColor} className="radar__chart__ticklabel">{`${Math.round(i*getHighestUsage(data))/10}k`}</text>
                    </React.Fragment>  
                )}

                {/* axis labels */}
                <text textAnchor="middle" alignmentBaseline="middle" transform={`rotate(270 ${10} ${padding + height/2})`} x={10} y={padding + height/2} fill={chartMainColor} className="radar__chart__legend">Satisfaction %</text>
                <text textAnchor="middle" alignmentBaseline="middle" x={width/2 + padding} y={height + padding + padding - 10} fill={chartMainColor} className="radar__chart__legend">Users</text>

            </svg>
        </div>
    </div>
)

// RadarChart.propTypes = {
//     score: PropTypes.number.isRequired
// }

export default RadarChart
