import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
// import getImageUrl from '../../helpers/getImageUrl'
import { PageContextConsumer } from './pageContext'
import Trans from '../i18n/Trans'
import { getPageSocialMeta } from './pageHelpers'

const PageMeta = ({ overrides = {} }) => (
    <PageContextConsumer>
        {context => (
            <Trans>
                {translate => {
                    const meta = getPageSocialMeta(context, translate, overrides)

                    return (
                        <Fragment>
                            <Helmet meta={meta} />
                        </Fragment>
                    )
                }}
            </Trans>
        )}
    </PageContextConsumer>
)

export default PageMeta
