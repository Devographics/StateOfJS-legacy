import React from 'react'
import TextBlock from '../components/TextBlock.js'
import T from '../helpers/translator'

const NewsletterIntro = () => (
    <TextBlock
        title={T.translate('components.newsletterintro.title')}
        text={T.translate('components.newsletterintro.text')}
    />
)

export default NewsletterIntro
