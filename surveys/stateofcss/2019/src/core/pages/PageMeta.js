import React, { useContext } from 'react'
import Helmet from 'react-helmet'
import { PageContext } from './pageContext'
import { I18nContext } from '../i18n/i18nContext'
import { getPageSocialMeta } from './pageHelpers'

const PageMeta = ({ overrides = {} }) => {
    const context = useContext(PageContext)
    const { translate } = useContext(I18nContext)

    const meta = getPageSocialMeta(context, translate, overrides)

    return <Helmet meta={meta} />
}

export default PageMeta
