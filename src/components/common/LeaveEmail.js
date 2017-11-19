import React from 'react'
import ReactGA from 'react-ga'

const LeaveEmail = () => (
    <div className="leave-email">
        <div className="newsletter" id="mc_embed_signup">
            <form
                action="//sachagreif.us2.list-manage.com/subscribe/post?u=b5af47765edbd2fc173dbf27a&amp;id=d8282e7e96"
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                className="validate"
                target="_blank"
                noValidate
            >
                <input
                    type="email"
                    placeholder="Your email"
                    name="EMAIL"
                    className="required email"
                    id="mce-EMAIL"
                />
                <input
                    onClick={() => ReactGA.event({ category: 'Subscribe', action: `leave email` })}
                    className="button"
                    type="submit"
                    value="Notify Me"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="button"
                />
            </form>
        </div>
    </div>
)

export default LeaveEmail
