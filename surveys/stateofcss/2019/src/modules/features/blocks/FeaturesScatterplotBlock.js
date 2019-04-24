import React from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import FeaturesScatterplotChart from '../charts/FeaturesScatterplotChart'
import { mergeFeaturesResources } from '../featuresHelpers'

const FeaturesScatterplotBlock = ({ block, data }) => {
    const { id } = block

    const features = mergeFeaturesResources(
        data.features.aggregations,
        data.features.fields.resources
    )

    return (
        <Block id={id} showDescription={false}>
            <FeaturesScatterplotChart features={features} />
        </Block>
    )
}

FeaturesScatterplotBlock.propTypes = {
    features: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            total: PropTypes.number.isRequired,
            usage: PropTypes.shape({
                used_it: PropTypes.number.isRequired,
                know_not_used: PropTypes.number.isRequired,
                never_heard_not_sure: PropTypes.number.isRequired
            }).isRequired,
            resources: PropTypes.shape({}).isRequired
        })
    ).isRequired
}

export default FeaturesScatterplotBlock
