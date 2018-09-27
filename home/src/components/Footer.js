import React from 'react'
import TextBlock from '../components/TextBlock'

const Footer = () => (
    <div className="footer home-footer">
        <TextBlock>
            <p>
                Hand-coded in Osaka, Japan with <a href="http://nivo.rocks">Nivo</a>{' '}
                & <a href="https://www.gatsbyjs.org/">Gatsby</a>. Extra data from{' '}
                <a href="https://bestofjs.org/">Best of JavaScript</a>
                .&nbsp;
                <a href="https://github.com/StateOfJS/StateOfJS">Leave an issue</a>
                &nbsp;or&nbsp;
                <a href="mailto:hello@stateofjs.com">Get in touch</a>.
            </p>
        </TextBlock>
    </div>
)

export default Footer
