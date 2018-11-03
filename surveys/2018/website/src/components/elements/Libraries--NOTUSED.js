import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import find from 'lodash/find'
import classNames from 'classnames'
import libraries from '../../data/bestofjs.json'
import { aliases } from '../../constants'
import paddingFormula from '../../helpers/paddingFormula'


const Libraries = ({ data, variant = 'horizontal' }) => (
    <div className={`libraries libraries--${variant} libraries--${data.length}-items`}>
        <div className="libraries__inner" style={{ padding: paddingFormula(data.length) }}>
            {data.map(result => {
                const key = result.name || result.key
                const libraryName = aliases[key] ? aliases[key] : key
                const library = find(
                    libraries.projects,
                    project =>
                        project.name &&
                        project.name.toLowerCase() === libraryName &&
                        libraryName.toLowerCase()
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

Libraries.propTypes = {
    data: PropTypes.array.isRequired,
    variant: PropTypes.string
}

export default Libraries
