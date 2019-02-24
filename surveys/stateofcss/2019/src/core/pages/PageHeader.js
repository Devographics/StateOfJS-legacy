import React, { useContext } from 'react'
import { PageContext } from './pageContext'
import { I18nContext } from '../i18n/i18nContext'
import { getPageLabel } from './pageHelpers'

const PageHeader = ({ showIntro = true, introduction }) => {
    const context = useContext(PageContext)
    const { translate } = useContext(I18nContext)

    const title = getPageLabel(context, translate)

    return (
        <>
            <h2 className="Page__Title">
                .
                {title
                    .replace(/ /g, '_')
                    .replace(/&/g, '')
                    .replace(/__/i, '_')}
                {' {'}
            </h2>
            {showIntro && (
                <div className="Page__Intro" dangerouslySetInnerHTML={{ __html: introduction }} />
            )}
        </>
    )
}

export default PageHeader
