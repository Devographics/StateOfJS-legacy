import React, { useContext } from 'react'
import Link from 'gatsby-link'
import locales from '../../../config/locales.yml'
import { PageContext } from '../pages/pageContext'

const LangSelector = () => {
    const context = useContext(PageContext)
    const links = locales.map(locale => {
        return {
            ...locale,
            link: `${locale.path === 'default' ? '' : `/${locale.path}`}${context.basePath}`,
            isCurrent: locale.locale === context.locale
        }
    })

    return (
        <div className="Locales">
            {links.map(({ label, locale, link, isCurrent }) => (
                <Link
                    className={`Locales__Item Locales__Item--${isCurrent && 'current'}`}
                    key={locale}
                    to={link}
                >
                    {label}
                </Link>
            ))}
        </div>
    )
}

export default LangSelector
