import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import { PageContext } from 'core/helpers/pageContext'
import { I18nContext } from 'core/i18n/i18nContext'
import FeatureUsageWaffleChart from '../charts/FeatureUsageWaffleChart'
import FeatureUsageBarChart from '../charts/FeatureUsageBarChart'
import { mergeFeaturesResources } from '../featuresHelpers'

const FeatureBlock = ({ block, data }) => {
    const features = mergeFeaturesResources(
        data.features.aggregations,
        data.features.fields.resources
    )
    const feature = features.find(a => a.id === block.id)

    const context = useContext(PageContext)
    const { translate } = useContext(I18nContext)

    let mdnInfo
    if (feature.resources.mdn !== null && feature.resources.mdn.length > 0) {
        mdnInfo = feature.resources.mdn.find(i => i.locale === context.locale)
        if (!mdnInfo) {
            mdnInfo = feature.resources.mdn[0]
        }
    }

    const caniuseInfo = feature.resources.caniuse

    return (
        <Block id={block.id} showDescription={false}>
            <div className="Feature">
                <div className="Feature__Chart">
                    <div style={{ height: 260 }}>
                        <FeatureUsageBarChart feature={feature} />
                    </div>
                </div>
                <div className="Feature__Description">
                    {mdnInfo && <div dangerouslySetInnerHTML={{ __html: mdnInfo.summary }} />}
                    {!mdnInfo && translate(`block.description.${block.id}`)}
                </div>
                <div className="Feature__Resources">
                    <div className="Feature__Support">browser support:</div>
                    <div className="Feature__Links">
                        {caniuseInfo && (
                            <div>
                                resources:
                                <div>
                                    <a
                                        href={caniuseInfo.spec}
                                        title="spec"
                                        className="Feature__Links__Item"
                                    >
                                        {translate('feature.specication_link')}
                                    </a>
                                    {caniuseInfo.links.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            title={link.title}
                                            className="Feature__Links__Item"
                                        >
                                            {link.title}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Block>
    )
}

FeatureBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
    }).isRequired,
    feature: PropTypes.shape({
        id: PropTypes.string.isRequired
    }).isRequired
}

export default FeatureBlock
