import React from 'react'
import { PageContextConsumer } from '../pages/pageContext'
import Trans from '../i18n/Trans'
import Debug from '../components/Debug'
import { getPageSocialMeta } from './pageHelpers'

const PageMetaDebug = ({ overrides = {} }) => (
    <PageContextConsumer>
        {context => {
            if (!context.isDebugEnabled) return null

            return (
                <Trans>
                    {translate => {
                        const meta = getPageSocialMeta(context, translate, overrides)

                        const metaObject = meta.reduce((acc, meta) => {
                            const key = meta.property || meta.name

                            return {
                                ...acc,
                                [key]: meta.content
                            }
                        }, {})

                        return <Debug title="Page meta" data={metaObject} />
                    }}
                </Trans>
            )
        }}
    </PageContextConsumer>
)

export default PageMetaDebug
