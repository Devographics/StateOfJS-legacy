import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/Block'
import ChartContainer from 'core/charts/ChartContainer'
import { PageContext } from 'core/pages/pageContext'
import { I18nContext } from 'core/i18n/i18nContext'

const ToolOpinionBlock = ({ block, buckets }) => {
    const context = useContext(PageContext)
    const { translate } = useContext(I18nContext)

    return (
        <Block id={block.id} showDescription={true}>
            <ChartContainer>
                {buckets.map(bucket => (
                    <div key={bucket.id}>
                        {bucket.id}: <strong>{bucket.count}</strong>
                    </div>
                ))}
            </ChartContainer>
        </Block>
    )
}

ToolOpinionBlock.propTypes = {
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

export default ToolOpinionBlock
