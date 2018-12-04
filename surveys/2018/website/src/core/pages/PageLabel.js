import React from 'react'
import { getPageLabel } from './pageHelpers'
import Trans from '../i18n/Trans'

const PageLabel = ({ page, mode = 'short' }) => (
    <Trans>
        {translate => {
            return getPageLabel(page, translate, mode)
        }}
    </Trans>
)

export default PageLabel
