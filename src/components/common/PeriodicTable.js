import React from 'react';
import elements from '../../data/periodictable.yaml';
import shuffle from 'lodash/shuffle';

const multiply = (a, n) => [...Array(n - 1).keys()].reduce(x => [x, ...a].flat(), a);

const parseData = data => {
  data = [ ...data, ...data, ...data, ...data ]
  const allTools = []
  // let i = 0
  // const steps = data.map(s => s.tools).flat().length
  data.forEach(section => {
    const { color, tools } = section

    tools.forEach(tool => {
      // i++
      const [name, symbol, stars] = tool.split('/')
      // const opacity = 0.6 - ((i / steps)/2)

      allTools.push({
        name,
        symbol,
        stars,
        color,
        sectionName: section.name,
        // opacity,
      })
    })
  })
  return allTools
}

const PeriodicTable = () => (
  <div className="periodic-table-wrapper">
    <div className="periodic-table">
      {parseData(elements).map((element, i) => (
        <Element2 {...element} key={i} />
      ))}
      <div className="periodic-gradient" />
    </div>
  </div>
);

const Element = ({ name, symbol, stars, color }) => (
  <div className="periodic-element">
    <div className="periodic-element-stars">{stars}</div>
    <div className="periodic-element-content" style={{ color }}>
      <div className="periodic-element-symbol">{symbol}</div>
      <div className="periodic-element-name">{name}</div>
    </div>
  </div>
);

const Element2 = ({ name, symbol, stars, color, opacity }) => (
  <a
    // style={{ opacity }}
    className="periodic-element"
    target="_blank"
    href={`https://bestofjs.org/projects/${name.toLowerCase().replace('.', '')}`}
  >
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text className="periodic-element-stars" x="10" y="20" fontSize="14" fill="white">
        {stars}
      </text>

      <text
        className="periodic-element-symbol"
        x="50"
        y="60"
        width="100%"
        textAnchor="middle"
        fontSize="24"
        fill={color}
      >
        {symbol}
      </text>

      <text className="periodic-element-name" x="50" y="80" fontSize="14" fill={color} textAnchor="middle">
        {name}
      </text>
    </svg>
  </a>
);

export default PeriodicTable;
