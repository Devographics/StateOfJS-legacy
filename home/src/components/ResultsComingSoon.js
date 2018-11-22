import React from 'react'
import TextBlock from '../components/TextBlock.js'
import T from '../helpers/translator'

const ResultsComingSoon = () => (
    <TextBlock>
        {T.translate('components.resultscomingsoon.row1')}
        <br/><br/>
        {T.translate('components.resultscomingsoon.row2')}
    </TextBlock>
)

export default ResultsComingSoon
