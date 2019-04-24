import { useContext } from 'react'
import { getPageLabel } from '../helpers/pageHelpers'
import { I18nContext } from '../i18n/i18nContext'

const PageLabel = ({ page, isContextual, includeWebsite }) => {
    const { translate } = useContext(I18nContext)

    return getPageLabel(page, translate, { isContextual, includeWebsite })
}

export default PageLabel
