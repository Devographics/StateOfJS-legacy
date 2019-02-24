import { useContext } from 'react'
import PropTypes from 'prop-types'
import { I18nContext } from './i18nContext'

const Trans = ({ children }) => {
    const { translate } = useContext(I18nContext)

    return children(translate)
}

Trans.propTypes = {
    children: PropTypes.func.isRequired
}

export default Trans
