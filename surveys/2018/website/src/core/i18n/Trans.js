import React from 'react'
import PropTypes from 'prop-types'
import { I18nContextConsumer } from './i18nContext'
import { getTranslator } from './translator'

const Trans = ({ children }) => (
    <I18nContextConsumer>
        {catalogue => {
            return children(getTranslator(catalogue))
        }}
    </I18nContextConsumer>
)

Trans.propTypes = {
    children: PropTypes.func.isRequired
}

export default Trans
