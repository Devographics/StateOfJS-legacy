import React from 'react'
import T from '../helpers/translator'

const Bubbles = () => (
    <div className="bubbles">
        <h3 className="bubble bubble-great">
            <img alt="JavaScript is great!" src="images/left-speech-bubble.svg" />
            <span>{T.translate('components.bubbles.bubble-great')}</span>
        </h3>
        <h3 className="bubble bubble-mess">
            <img alt="JavaScript is a mess!" src="images/right-speech-bubble.svg" />
            <span>{T.translate('components.bubbles.bubble-mess')}</span>
        </h3>
    </div>
)

export default Bubbles
