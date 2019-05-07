import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import ChartContainer from 'core/charts/ChartContainer'
import OpinionScaleBarChart from 'core/charts/OpinionScaleBarChart'

const OpinionScaleBlock = ({ block, data }) => {
    if (!data || !data.data) {
        return (
            <div>OpinionScaleBlock: Missing data for block {block.id}, page data is undefined</div>
        )
    }

    const blockData = useMemo(() => data.data.aggregations.find(agg => agg.id === block.id), [
        block,
        data.data
    ])

    if (!blockData) {
        return <div>OpinionScaleBlock: Missing data for block {block.id}</div>
    }

    return (
        <Block id={block.id} showDescription={!!block.showDescription}>
            <ChartContainer>
                <OpinionScaleBarChart buckets={blockData.buckets} i18nNamespace={block.id} />
            </ChartContainer>
        </Block>
    )
}

OpinionScaleBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        showDescription: PropTypes.bool
    }).isRequired,
    data: PropTypes.shape({
        data: PropTypes.shape({
            aggregations: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    total: PropTypes.number,
                    buckets: PropTypes.arrayOf(
                        PropTypes.shape({
                            id: PropTypes.string.isRequired,
                            count: PropTypes.number.isRequired,
                            percentage: PropTypes.number
                        })
                    ).isRequired
                })
            ).isRequired
        }).isRequired
    }).isRequired
}

export default memo(OpinionScaleBlock)
