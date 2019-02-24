import React, { Component } from 'react'
import { Redirect } from '@reach/router'
import { getBlockTitle, getBlockDescription } from '../blocks/blockHelpers'
import { mergePageContext } from '../pages/pageHelpers'
import PageMeta from '../pages/PageMeta'
import PageMetaDebug from '../pages/PageMetaDebug'
import { PageContextProvider } from '../pages/pageContext'
import { I18nContextProvider } from '../i18n/i18nContext'
import Trans from '../i18n/Trans'

export default class ShareBlockTemplate extends Component {
    render() {
        const { pageContext, location } = this.props
        const context = mergePageContext(pageContext, location)

        return (
            <PageContextProvider value={context}>
                <I18nContextProvider>
                    <Trans>
                        {translate => {
                            const overrides = {
                                title: `${getBlockTitle(context.block, context, translate, {
                                    format: 'full'
                                })} #StateOfJS`,
                                description: getBlockDescription(
                                    context.block,
                                    context,
                                    translate,
                                    {
                                        isMarkdownEnabled: false
                                    }
                                )
                            }

                            return (
                                <div className="template">
                                    <PageMeta overrides={overrides} />
                                    <PageMetaDebug overrides={overrides} />
                                    {!context.isDebugEnabled && (
                                        <Redirect to={context.redirect} noThrow />
                                    )}
                                    Redirecting…
                                </div>
                            )
                        }}
                    </Trans>
                </I18nContextProvider>
            </PageContextProvider>
        )
    }
}
