import React, { useContext } from 'react'
import { PageContext } from '../helpers/pageContext'
import { I18nContext } from '../i18n/i18nContext'
import Debug from '../components/Debug'
import { getPageSocialMeta } from '../helpers/pageHelpers'

const PageMetaDebug = ({ overrides = {} }) => {
    const context = useContext(PageContext)
    const { translate } = useContext(I18nContext)

    if (!context.isDebugEnabled) return null

    const meta = getPageSocialMeta(context, translate, overrides)
    const metaObject = meta.reduce((acc, meta) => {
        const key = meta.property || meta.name

        return {
            ...acc,
            [key]: meta.content
        }
    }, {})

    return <Debug title="Page meta" data={metaObject} />
}

export default PageMetaDebug
