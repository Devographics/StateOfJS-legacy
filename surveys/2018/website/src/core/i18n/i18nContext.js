import React, { createContext } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { PageContextConsumer } from '../pages/pageContext'

const i18nContext = createContext()

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

export const I18nContextProvider = ({ children }) => (
    <StaticQuery query={translationsQuery}>
        {({ translations: _translations }) => {
            const translations = _translations.edges.map(t => t.node)

            return (
                <PageContextConsumer>
                    {context => {
                        const catalogue = translations.find(t => t.locale === context.locale)

                        return (
                            <i18nContext.Provider value={catalogue}>
                                {children}
                            </i18nContext.Provider>
                        )
                    }}
                </PageContextConsumer>
            )
        }}
    </StaticQuery>
)

export const I18nContextConsumer = i18nContext.Consumer
