import { useContext } from 'react'
import { getPageLabel } from './pageHelpers'
import { I18nContext } from '../i18n/i18nContext'

const PageLabel = ({ page, mode = 'short' }) => {
    const { translate } = useContext(I18nContext)

    return getPageLabel(page, translate, mode)
}

export default PageLabel
