import React, { useContext } from 'react'
import TextBlock from 'core/blocks/TextBlock'
import PageHeader from 'core/pages/PageHeader'
import { PageContext } from 'core/helpers/pageContext'
import BlockSwitcher from 'core/components/BlockSwitcher'

const PageTemplate = ({ data = {} }) => {
    const context = useContext(PageContext)

    console.log({ context, data })

    return (
        <>
            <PageHeader />
            {data.introduction && <TextBlock text={data.introduction.html} />}
            {context.blocks &&
                context.blocks.map((block, i) => (
                    <BlockSwitcher key={block.id} block={block} data={data} index={i} />
                ))}
        </>
    )
}

export default PageTemplate
