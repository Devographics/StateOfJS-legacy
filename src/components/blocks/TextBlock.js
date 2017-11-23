import React from 'react'
import addParagraphs from '../../helpers/paragraphs'
import parseBold from '../../helpers/bold'

const TextBlock = ({ text }) => 
    <div className="block block--text" dangerouslySetInnerHTML={{__html: parseBold(addParagraphs(text))}}/>

export default TextBlock
