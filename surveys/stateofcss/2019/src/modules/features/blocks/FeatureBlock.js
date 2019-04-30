import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import { PageContext } from 'core/helpers/pageContext'
import { I18nContext } from 'core/i18n/i18nContext'
import FeatureUsageWaffleChart from '../charts/FeatureUsageWaffleChart'
import FeatureUsageBarChart from '../charts/FeatureUsageBarChart'
import { mergeFeaturesResources } from '../featuresHelpers'
import FeatureUsageLegends from '../charts/FeatureUsageLegends'
import ChartContainer from 'core/charts/ChartContainer'

const FeatureResources = ({ caniuseInfo }) => {
    const { translate } = useContext(I18nContext)
    return (
        <div className="Feature__Resources FTBlock__Resources">
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
    )
}

const FeatureBlock = ({ block, data, index }) => {
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
            <div className="Feature FTBlock">
                <div className="Feature__Chart FTBlock__Chart">
                    <FeatureUsageLegends />
                    <ChartContainer height={40}>
                        <FeatureUsageBarChart feature={feature} />
                    </ChartContainer>
                </div>
                <div className="Feature__Description FTBlock__Description">
                    {mdnInfo ? (
                        <p dangerouslySetInnerHTML={{ __html: mdnInfo.summary }} />
                    ) : (
                        translate(`block.description.${block.id}`)
                    )}
                </div>
                {caniuseInfo && <FeatureResources caniuseInfo={caniuseInfo} />}
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
