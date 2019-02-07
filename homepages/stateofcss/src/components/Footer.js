import React from 'react'
import TextBlock from '../components/TextBlock'

const Footer = () => (
    <div className="footer home-footer">
        <TextBlock>
            <p>
                Hand-coded in Kyoto, Japan.{' '}
                <a href="https://github.com/StateOfJS/StateOfJS">Leave an issue</a>
                &nbsp;or&nbsp;
                <a href="mailto:hello@stateofjs.com">Get in touch</a>.
            </p>
        </TextBlock>
    </div>
)

export default Footer
