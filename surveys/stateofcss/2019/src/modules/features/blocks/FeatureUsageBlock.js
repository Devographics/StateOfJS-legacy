import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/Block'
import ChartContainer from 'core/charts/ChartContainer'
import { PageContext } from 'core/pages/pageContext'
import { I18nContext } from 'core/i18n/i18nContext'

const FeatureUsageBlock = ({ block, buckets, resources }) => {
    const context = useContext(PageContext)
    const { translate } = useContext(I18nContext)

    let mdnInfo
    if (resources.mdn !== null && resources.mdn.length > 0) {
        mdnInfo = resources.mdn.find(i => i.locale === context.locale)
        if (!mdnInfo) {
            mdnInfo = resources.mdn[0]
        }
    }

    const caniuseInfo = resources.caniuse

    return (
        <Block id={block.id} showDescription={false}>
            <ChartContainer>
                {mdnInfo && (
                    <div
                        className="Block__Description"
                        dangerouslySetInnerHTML={{ __html: mdnInfo.summary }}
                    />
                )}
                {!mdnInfo && (
                    <div className="Block__Description">
                        {translate(`block.description.${block.id}`)}
                    </div>
                )}
                <h3>Usage</h3>
                {buckets.map(bucket => (
                    <div key={bucket.id}>
                        {bucket.id}: <strong>{bucket.count}</strong>
                    </div>
                ))}
                {caniuseInfo && (
                    <>
                        <br />
                        <div>
                            links:
                            <ul>
                                <li>
                                    <a href={caniuseInfo.spec} title="spec">
                                        {translate('feature.specication_link')}
                                    </a>
                                </li>
                                {caniuseInfo.links.map((link, i) => (
                                    <li key={i}>
                                        <a href={link.url} title={link.title}>
                                            {link.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </ChartContainer>
        </Block>
    )
}

FeatureUsageBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
    }).isRequired,
    buckets: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired
        })
    ).isRequired
}

export default FeatureUsageBlock
