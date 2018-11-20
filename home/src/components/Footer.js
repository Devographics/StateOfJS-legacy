import React from 'react'
import TextBlock from '../components/TextBlock'
import T from '../helpers/translator'

const Footer = () => (
    <div className="footer home-footer">
        <TextBlock>
            <p>
                {T.translate('components.footer.text')} <a href="http://nivo.rocks">Nivo</a>{' '}
                & <a href="https://www.gatsbyjs.org/">Gatsby</a>. {T.translate('components.footer.extra')}{' '}
                <a href="https://bestofjs.org/">Best of JavaScript</a>
                .&nbsp;
                <a href="https://github.com/StateOfJS/StateOfJS">{T.translate('components.footer.issue')}</a>
                &nbsp;or&nbsp;
                <a href="mailto:hello@stateofjs.com">{T.translate('components.footer.get-in-touch')}</a>.
            </p>
        </TextBlock>
    </div>
)

export default Footer
