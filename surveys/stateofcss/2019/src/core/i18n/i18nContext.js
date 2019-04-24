import React, { createContext, useContext } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { getTranslator } from './translator'
import { PageContext } from '../helpers/pageContext'

export const I18nContext = createContext()

const translationsQuery = graphql`
    query {
        translations: allTranslationsYaml {
            edges {
                node {
                    locale
                    translations {
                        key
                        t
                    }
                }
            }
        }
    }
`

export const I18nContextProvider = ({ children }) => {
    const context = useContext(PageContext)

    return (
        <StaticQuery query={translationsQuery}>
            {({ translations: _translations }) => {
                const translations = _translations.edges.map(t => t.node)
                const catalogue = translations.find(t => t.locale === context.locale)
                const translate = getTranslator(catalogue)

                return (
                    <I18nContext.Provider value={{ translate, catalogue }}>
                        {children}
                    </I18nContext.Provider>
                )
            }}
        </StaticQuery>
    )
}
