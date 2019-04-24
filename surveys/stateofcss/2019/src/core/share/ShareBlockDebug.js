import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { PageContext } from 'core/helpers/pageContext'
import { I18nContext } from 'core/i18n/i18nContext'
import { getBlockMeta } from 'core/helpers/blockHelpers'
import Debug from '../components/Debug'

const ShareBlockDebug = ({ id }) => {
    const context = useContext(PageContext)
    const { translate } = useContext(I18nContext)

    if (!context.isDebugEnabled) return null

    const meta = getBlockMeta(id, context, translate)

    return <Debug title="Block sharing" data={meta} />
}

ShareBlockDebug.propTypes = {
    id: PropTypes.string.isRequired
}

export default ShareBlockDebug
