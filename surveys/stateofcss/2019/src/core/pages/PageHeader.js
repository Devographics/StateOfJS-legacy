import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { PageContext } from '../helpers/pageContext'
import { I18nContext } from '../i18n/i18nContext'
import { getPageLabel } from '../helpers/pageHelpers'

const PageHeader = ({ title: titleOverride, showIntro = true, introduction }) => {
    const context = useContext(PageContext)
    const { translate } = useContext(I18nContext)

    const title = titleOverride || getPageLabel(context, translate)

    return (
        <>
            <h2 className="Page__Title">{title}</h2>
            {showIntro && (
                <div className="Page__Intro" dangerouslySetInnerHTML={{ __html: introduction }} />
            )}
        </>
    )
}

PageHeader.propTypes = {
    title: PropTypes.string,
    showIntro: PropTypes.bool,
    introduction: PropTypes.node
}

export default PageHeader
