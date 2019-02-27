import React from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/Block'

const allKeys = [
    'used_it',
    'know_not_used',
    'never_heard_not_sure'
]

const FeaturesScatterplotBlock = ({ features }) => {
    return (
        <Block id="scatterplot" showDescription={false}>
            <h2>scatterplot</h2>
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
                never_heard_not_sure: PropTypes.number.isRequired,
            }).isRequired,
            resources: PropTypes.shape({

            }).isRequired
        })
    ).isRequired,
}

export default FeaturesScatterplotBlock
