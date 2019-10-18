import React from 'react'
import addParagraphs from '../helpers/paragraphs'
import parseBold from '../helpers/bold'

const TextBlock = ({ text, title, children }) => {
    if (children) {
        return <div className="block block--text">{children}</div>
    } else {
        return (
            <div className="block block--text">
                {title && <h3 className="block__title">{title}</h3>}
                {text && (
                    <div
                        className="block__content"
                        dangerouslySetInnerHTML={{ __html: parseBold(addParagraphs(text)) }}
                    />
                )}
            </div>
        )
    }
}

export default TextBlock
