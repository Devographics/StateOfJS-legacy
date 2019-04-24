import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import ShareBlock from '../share/ShareBlock'
import { I18nContext } from '../i18n/i18nContext'
import { PageContext } from '../helpers/pageContext'
import { getBlockTitle, getBlockDescription } from 'core/helpers/blockHelpers'

const BlockTitle = ({ id, showDescription, isShareable, values }) => {
    const [showOptions, setShowOptions] = useState(false)
    const context = useContext(PageContext)
    const { translate } = useContext(I18nContext)

    const title = getBlockTitle(id, context, translate, { values })
    let description = ''
    if (showDescription === true) {
        description = getBlockDescription(id, context, translate, {
            values
        })
    }

    return (
        <div className={`Block__Heading Block__Heading--${id}`}>
            <div className={`Block__Title Block__Title--${showOptions ? 'open' : 'closed'}`}>
                <h3 className="Block__Title__Text Block__Title__Text--short">{title}</h3>
                <h3 className="Block__Title__Text Block__Title__Text--full">
                    {title || translate(`fullcharts.${id}`, { values })}
                </h3>
                {isShareable && (
                    <ShareBlock
                        id={id}
                        className="Block__Title__Share"
                        values={values}
                        toggleClass={() => {
                            setShowOptions(!showOptions)
                        }}
                    />
                )}
            </div>
            {showDescription && (
                <div className="Block__Description">
                    <ReactMarkdown source={description} />
                </div>
            )}
        </div>
    )
}

BlockTitle.propTypes = {
    id: PropTypes.string.isRequired,
    showDescription: PropTypes.bool.isRequired,
    isShareable: PropTypes.bool.isRequired
}

BlockTitle.defaultProps = {
    showDescription: true,
    isShareable: true
}

export default BlockTitle
