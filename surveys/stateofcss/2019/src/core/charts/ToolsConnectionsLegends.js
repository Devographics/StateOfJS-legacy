import React, { Component, useContext } from 'react'
import PropTypes from 'prop-types'
import { chordScale } from '../../constants'
import LegendsItem from './LegendsItem'
import { I18nContext } from '../common/i18n/i18nContext'

const ToolsConnectionsLegends = ({ sections, selectedSections, onChange }) => {
    const { translate } = useContext(I18nContext)

    return (
        <div className="Legends Legends--withFrame Legends--connections">
            {sections.map((section, i) => {
                const isSelected = selectedSections.includes(section)

                return (
                    <LegendsItem
                        id={section}
                        key={section}
                        label={translate(`section.${section}`)}
                        onClick={({ id }) => {
                            onChange(id)
                        }}
                        color={chordScale[i]}
                        chipSize={16}
                        style={{ opacity: isSelected ? 1 : 0.5 }}
                    />
                )
            })}
        </div>
    )
}

ToolsConnectionsLegends.propTypes = {
    sections: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedSections: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired
}

export default ToolsConnectionsLegends
