import React from 'react'
import TextBlock from '../components/TextBlock.js'
import T from '../helpers/translator'

let heading = T.translate('components.intro.heading')

const Intro = () => (
    <TextBlock>
        <strong className="dropcap">{heading[0]}</strong>{heading.slice(1)}
        <br/>
        {T.translate('components.intro.row1')}
        <br/>
        {T.translate('components.intro.row2')}
    </TextBlock>
)

export default Intro