import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import Trans from '../i18n/Trans'

const postUrl =
    'https://emailoctopus.com/lists/463dc2a9-b2ff-11e8-a3c9-06b79b628af2/members/embedded/1.3/add'

export default class Newsletter extends Component {
    static propTypes = {
        line: PropTypes.string
    }

    state = {
        email: '',
        submitted: false,
        loading: false,
        error: null,
        success: null
    }

    handleChange = e => {
        const email = e.target.value
        this.setState({
            email
        })
    }

    handleSubmit = async e => {
        const { email } = this.state

        this.setState({ loading: true })

        e.preventDefault()
        ReactGA.event({
            category: 'Subscribe',
            action: `Newsletter subscribe`
        })
        const response = await fetch(postUrl, {
            method: 'POST',
            body: `field_0=${encodeURIComponent(email)}`,
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
        const result = await response.json()
        const { error, message } = result

        this.setState({ loading: false })

        if (error) {
            this.setState({ error, success: null })
        } else {
            this.setState({ error: null, success: { message } })
        }
    }

    render() {
        const { email, loading, error, success } = this.state

        return (
            <Trans>
                {translate => {
                    const { submitLabel = translate('notify_me') } = this.props

                    return (
                        <div className={`Newsletter Newsletter--${loading ? 'loading' : ''}`}>
                            {error && <div className="Newsletter__Error">{error.message}</div>}
                            {success ? (
                                <div className="Newsletter__Success">{success.message}</div>
                            ) : (
                                <form
                                    method="post"
                                    action={postUrl}
                                    datasitekey="6LdYsmsUAAAAAPXVTt-ovRsPIJ_IVhvYBBhGvRV6"
                                    onSubmit={this.handleSubmit}
                                >
                                    <input
                                        className="Newsletter__Email"
                                        id="field_0"
                                        name="field_0"
                                        type="email"
                                        placeholder={translate('your_email')}
                                        onChange={this.handleChange}
                                        value={email}
                                        disabled={loading}
                                    />

                                    <input
                                        type="text"
                                        name="hp463dc2a9-b2ff-11e8-a3c9-06b79b628af2"
                                        tabIndex="-1"
                                        autoComplete="nope"
                                        className="Newsletter__Hidden"
                                    />

                                    <button
                                        type="submit"
                                        name="subscribe"
                                        className="Newsletter__Button Button"
                                    >
                                        {submitLabel}
                                    </button>
                                </form>
                            )}
                        </div>
                    )
                }}
            </Trans>
        )
    }
}
