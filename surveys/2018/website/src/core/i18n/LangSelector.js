import React from 'react'
import Link from 'gatsby-link'
import locales from '../../../../config/locales.yml'
import { PageContextConsumer } from '../pages/pageContext'

const LangSelector = () => (
    <PageContextConsumer>
        {context => {
            const links = locales.map(locale => {
                return {
                    ...locale,
                    link: `${locale.path === 'default' ? '' : `/${locale.path}`}${
                        context.basePath
                    }`,
                    isCurrent: locale.locale === context.locale
                }
            })

            return (
                <span
                    style={{
                        position: 'fixed',
                        zIndex: 10000,
                        bottom: 20,
                        right: 20,
                        background: '#111',
                        fontSize: '14px',
                        padding: '10px'
                    }}
                >
                    {links.map(link => (
                        <Link
                            key={link.locale}
                            to={link.link}
                            style={{
                                display: 'block',
                                fontWeight: link.isCurrent ? 'bold' : 'normal'
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </span>
            )
        }}
    </PageContextConsumer>
)

export default LangSelector
