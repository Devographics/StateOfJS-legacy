import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class AffinityToggle extends Component {
    static propTypes = {
        sections: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
            })
        ).isRequired,
        selectedSections: PropTypes.arrayOf(PropTypes.string).isRequired,
        onChange: PropTypes.func.isRequired,
        maxNumberOfSections: PropTypes.number.isRequired,
    }

    handleOptionClick = e => {
        this.props.onChange(e.target.value)
    }

    render() {
        const { sections, selectedSections, maxNumberOfSections } = this.props

        return (
            <div className="chord__toggle">
                {sections.map(section => {
                    const isChecked = selectedSections.includes(section.id)
                    const isDisabled = !isChecked && selectedSections.length >= maxNumberOfSections

                    return (
                        <label
                            htmlFor={section.id+'__check'}
                            key={section.id}
                            className={classnames('chord__toggle__item', {
                                'chord__toggle__item--is-disabled': isDisabled,
                            })}
                        >
                            <input
                                type="checkbox"
                                id={section.id+'__check'}
                                value={section.id}
                                checked={isChecked}
                                onChange={this.handleOptionClick}
                                disabled={isDisabled}
                            />
                            {section.label}
                        </label>
                    )
                })}
            </div>
        )
    }
}
