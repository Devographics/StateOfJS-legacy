import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import TransText from '../i18n/TransText'

export default class DisplayModeSwitch extends Component {
    static propTypes = {
        mode: PropTypes.oneOf(['percents', 'counts']).isRequired,
        onChange: PropTypes.func.isRequired
    }

    handleClick = mode => () => {
        this.props.onChange(mode)
    }

    render() {
        const { mode } = this.props

        return (
            <div className="ButtonGroup">
                <span
                    className={classNames('Button Button--small', {
                        'Button--disabled': mode !== 'percents'
                    })}
                    onClick={this.handleClick('percents')}
                >
                    <TransText id="percents_display_mode" />
                </span>
                <span
                    className={classNames('Button Button--small', {
                        'Button--disabled': mode !== 'counts'
                    })}
                    onClick={this.handleClick('counts')}
                >
                    <TransText id="counts_display_mode" />
                </span>
            </div>
        )
    }
}
