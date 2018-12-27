import React, { Component } from 'react'
import Locales from './Locales'
import { PageContextConsumer } from '../pages/pageContext'

export default class LanguageSwitcher extends Component {
    state = {
        open: false
    }

    toggle = () => {
        this.setState({ open: !this.state.open })
    }

    render() {
        const { open } = this.state
        const { position = 'bottom' } = this.props

        return (
            <PageContextConsumer>
                {context => (
                    <div className={`LanguageSwitcher LanguageSwitcher--${position} LanguageSwitcher--${open ? 'open' : 'closed'}`}>
                        <div className="LanguageSwitcher__Toggle" onClick={this.toggle}>
                            <span>{context.localeLabel}</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 100 50"
                            >
                                <polygon
                                    stroke="#000"
                                    points="0,0 100,0 50,50"
                                />
                            </svg>
                        </div>
                        {open && (
                            <div className="LanguageSwitcher__Options">
                                <Locales />
                            </div>
                        )}
                    </div>
                )}
            </PageContextConsumer>
        )
    }
}
