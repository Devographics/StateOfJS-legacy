import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import fetch from 'isomorphic-fetch'

const postUrl =
    'https://emailoctopus.com/lists/ed0386c4-2f55-11e9-a3c9-06b79b628af2/members/embedded/1.3/add'

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
        const { submitLabel = 'Notify Me' } = this.props
        const { email, loading, error, success } = this.state

        return (
            <div
                className={`Block Block--Newsletter Newsletter Newsletter--${
                    loading ? 'loading' : ''
                }`}
            >
                <h3 className="Block__Heading">Stay Tuned</h3>
                <p className="Block__Concent">
                    Leave us your email and we’ll let you know when the next survey takes place.
                </p>

                {success ? (
                    <div className="Newsletter__Message Newsletter__Success">{success.message}</div>
                ) : (
                    <form
                        method="post"
                        action={postUrl}
                        datasitekey="6LdYsmsUAAAAAPXVTt-ovRsPIJ_IVhvYBBhGvRV6"
                        onSubmit={this.handleSubmit}
                    >
                        <label className="hidden" htmlFor="field_0">Email</label>

                        <input
                            className="Newsletter__Email"
                            id="field_0"
                            name="field_0"
                            type="email"
                            placeholder="Your Email"
                            onChange={this.handleChange}
                            value={email}
                            disabled={loading}
                        />

                        <input
                            type="text"
                            name="hped0386c4-2f55-11e9-a3c9-06b79b628af2"
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
                {error && <div className="Newsletter__Message Newsletter__Error">{error.message}</div>}

            </div>
        )
    }
}
