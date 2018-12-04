import React from 'react'
import PropTypes from 'prop-types'
import { I18nContextConsumer } from './i18nContext'
import { getTranslator } from './translator'

const TransText = ({ id, values = {} }) => (
    <I18nContextConsumer>
        {catalogue => getTranslator(catalogue)(id, { values })}
    </I18nContextConsumer>
)

TransText.propTypes = {
    id: PropTypes.string.isRequired,
    values: PropTypes.object
}

export default TransText
