import React, { useContext } from 'react'
import { PageContext } from './pageContext'
import { I18nContext } from '../i18n/i18nContext'
import { getPageLabel } from './pageHelpers'

const PageHeader = ({ showIntro = false, introduction }) => {
    const context = useContext(PageContext)
    const { translate } = useContext(I18nContext)

    const title = getPageLabel(context, translate)

    return (
        <div className="PageHeader">
            <div className="PageHeader__Header">
                <h2 className="PageHeader__Title">{title}</h2>
            </div>
            {showIntro && <div dangerouslySetInnerHTML={{ __html: introduction }} />}
        </div>
    )
}

export default PageHeader
