import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import TextBlock from 'core/blocks/TextBlock'
import ChartContainer from 'core/charts/ChartContainer'
// import { PageContext } from 'core/helpers/pageContext'
import { I18nContext } from 'core/i18n/i18nContext'
import { getToolDescription } from '../tools_helpers'
import ToolOpinionsChart from '../charts/ToolOpinionsChart'

const ToolOpinionBlock = ({ block, data }) => {

    const blockData = data.aggs.aggregations.find(a => a.id === block.id)
    const resources = data.aggs.fields.resources.find(r => r.id === block.id)

    if (!blockData) {
        return <div key={block.id}>No data available for tool: {block.id}</div>
    }

    const buckets = blockData.buckets

    const { translate } = useContext(I18nContext)

    return (
        <Block id={block.id} showDescription={false}>
            <TextBlock text={getToolDescription(block, resources, translate)} />
            <ChartContainer>
                <ToolOpinionsChart/>
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
}

export default ToolOpinionBlock
