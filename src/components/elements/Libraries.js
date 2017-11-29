import React from 'react'
import PropTypes from 'prop-types'
import libraries from '../../data/libraries.json'
import find from 'lodash/find'
import { aliases } from '../../constants.js'
import classNames from 'classnames'

const paddingFormula = numberOfBars => {
  const numberOfColumns = numberOfBars * 2 + 1
  const singleColumnWidth = `100%/${numberOfColumns}`
  const paddingWidth = `${singleColumnWidth}/2`
  return `0 calc(${paddingWidth})`
}

const Star = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
)

const Libraries = ({ data, variant = 'horizontal' }) => (
  <div className={`libraries libraries--${variant} libraries--${data.length}-items`}>
    <div className="libraries__inner" style={{padding: paddingFormula(data.length)}}>
      {data.map(result => {
        const key = result.tool || result.key
        const libraryName = aliases[key] ? aliases[key] : key
        const library = find(
          libraries.projects,
          project => project.name.toLowerCase() === libraryName.toLowerCase()
        )

        if (library) {
          return (
            <div key={libraryName} className="libraries__item">
              <span className="libraries__item__link libraries__item__link--enabled">
                {libraryName}
              </span>
              <Tooltip library={library} variant={variant} />
            </div>
          )
        } else {
          return (
            <div key={libraryName} className="libraries__item">
              <span className="libraries__item__link">{libraryName}</span>
            </div>
          )
        }
      })}
    </div>
  </div>
)

const Tooltip = ({ library, variant }) => {
  const githubUrl = `https://github.com/${library.github}`
  const bestofjsUrl = `https://bestof.js.org/projects/${library.slug}`

  return (
    <div
      className={classNames(
        'library__tooltip',
        { 'arrow-top': variant === 'horizontal' },
        { 'arrow-right': variant === 'vertical' }
      )}
    >
      <div className="toolip__topzone" />
      <div className="tooltip__inner">
        <h3 className="tooltip__title">
          <a className="tooltip__title__homepage" href={library.homepage}>
            {library.name}
          </a>
          <a className="tooltip__title__stars" href={githubUrl}>
            <Star />
            {library.stars.toLocaleString()}
          </a>
        </h3>
        <p>{library.description}</p>
        <h4>Learn More</h4>
        <ul>
          <li>
            <a href={library.homepage}>Homepage</a>
          </li>
          <li>
            <a href={githubUrl}>GitHub</a>
          </li>
          <li>
            <a href={bestofjsUrl}>BestOfJS</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

Libraries.propTypes = {
  data: PropTypes.array.isRequired,
  variant: PropTypes.string,
}

export default Libraries
