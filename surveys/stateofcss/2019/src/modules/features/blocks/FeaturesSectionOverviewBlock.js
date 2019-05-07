import React from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import FeaturesScatterplotChart from '../charts/FeaturesScatterplotChart'
import FeaturesTreeMapChart from '../charts/FeaturesTreeMapChart'
import { mergeFeaturesResources } from '../featuresHelpers'

const FeaturesSectionOverviewBlock = ({ block, data }) => {
    const features = mergeFeaturesResources(data.data.aggregations, data.data.fields.resources)

    return (
        <Block id={block.id} showDescription={false}>
            <FeaturesScatterplotChart features={features} />
            <FeaturesTreeMapChart features={features} />
        </Block>
    )
}

FeaturesSectionOverviewBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
    }).isRequired,
    data: PropTypes.shape({
        data: PropTypes.shape({
            aggregations: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    total: PropTypes.number.isRequired,
                    buckets: PropTypes.arrayOf(
                        PropTypes.shape({
                            id: PropTypes.string.isRequired,
                            count: PropTypes.number.isRequired,
                            percentage: PropTypes.number.isRequired
                        })
                    ).isRequired
                })
            )
        }).isRequired
    }).isRequired
}

export default FeaturesSectionOverviewBlock
