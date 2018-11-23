import React from 'react'
import { PageContextConsumer } from './pageContext'
import Trans from '../i18n/Trans'
import { getPageLabel } from './pageHelpers'

const PageHeader = ({ showIntro = false, introduction }) => (
    <PageContextConsumer>
        {context => (
            <Trans>
                {translate => {
                    const title = getPageLabel(context, translate)

                    return (
                        <div className="PageHeader">
                            <div className="PageHeader__Header">
                                <h2 className="PageHeader__Title">{title}</h2>
                            </div>
                            {showIntro && (
                                <div dangerouslySetInnerHTML={{ __html: introduction }} />
                            )}
                        </div>
                    )
                }}
            </Trans>
        )}
    </PageContextConsumer>
)

export default PageHeader
