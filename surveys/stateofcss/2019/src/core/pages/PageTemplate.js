import React, { useContext } from 'react'
import TextBlock from 'core/blocks/TextBlock'
import PageHeader from 'core/pages/PageHeader'
import { PageContext } from 'core/pages/pageContext'
import BlockSwitcher from 'core/blocks/BlockSwitcher'

// try id variants with both `-` and `_`
// TODO: normalize data to make this less hacky
const getBlockData = (data, id) => {
    const stats = data.stats && (data.stats[id] || data.stats[id.replace(/-/g, '_')])
    const yearData = stats && stats.find(d => d.survey === '2018')
    return yearData
}

const PageTemplate = ({ data = {} }) => {
    const context = useContext(PageContext)
    return (
        <>
            <PageHeader />
            {data.introduction && <TextBlock text={data.introduction.html} />}
            {context.blocks &&
                context.blocks.map(block => (
                    <BlockSwitcher
                        key={block.id}
                        block={block}
                        data={getBlockData(data, block.id)}
                    />
                ))}
        </>
    )
}

export default PageTemplate
