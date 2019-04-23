import React, { useContext } from 'react'
import TextBlock from 'core/blocks/TextBlock'
import PageHeader from 'core/pages/PageHeader'
import { PageContext } from 'core/pages/pageContext'
import BlockSwitcher from 'core/blocks/BlockSwitcher'

const PageTemplate = ({ data = {} }) => {
    const context = useContext(PageContext)
    console.log(context)
    return (
        <>
            <PageHeader />
            {data.introduction && <TextBlock text={data.introduction.html} />}
            {context.blocks && context.blocks.map(block => (
                <BlockSwitcher key={block.id} {...block} />
            ))}
        </>
    )
}

export default PageTemplate
