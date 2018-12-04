import React from 'react'
import PropTypes from 'prop-types'
import { PageContextConsumer } from '../pages/pageContext'
import Trans from '../i18n/Trans'
import { getBlockMeta } from '../blocks/blockHelpers'
import Debug from '../components/Debug'

const ShareBlockDebug = ({ id }) => (
    <PageContextConsumer>
        {context => {
            if (!context.isDebugEnabled) return null

            return (
                <Trans>
                    {translate => {
                        const meta = getBlockMeta(id, context, translate)

                        return <Debug title="Block sharing" data={meta} />
                    }}
                </Trans>
            )
        }}
    </PageContextConsumer>
)

ShareBlockDebug.propTypes = {
    id: PropTypes.string.isRequired
}

export default ShareBlockDebug
