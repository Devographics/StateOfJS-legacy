import React, { useContext } from 'react'
import TextBlock from '../core/blocks/TextBlock'
import PageHeader from '../core/pages/PageHeader'
import { PageContext } from 'core/pages/pageContext'

const OpinionsPage = ({ data, ...rest }) => {
    const context = useContext(PageContext)
    console.log(context)
    return (
        <>
            <PageHeader showIntro={false} />

            {context.blocks.map(block => (
                <TextBlock key={block.id} text={`@todo ${block.id}`} />
            ))}
        </>
    )
}

export default OpinionsPage
