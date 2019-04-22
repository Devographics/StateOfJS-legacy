import React, { useContext } from 'react'
import TextBlock from '../core/blocks/TextBlock'
import PageHeader from '../core/pages/PageHeader'
import UnitsSelectorsBlock from '../modules/units-selectors/blocks/UnitsSelectorsBlock'
import { PageContext } from 'core/pages/pageContext'

const UnitsAndSelectorsPage = ({ data }) => {
    const context = useContext(PageContext)

    return (
        <>
            <PageHeader showIntro={false} />
            <TextBlock text="@todo" />
            {context.blocks.map(block => (
                <UnitsSelectorsBlock key={block.id} block={block} />
            ))}
        </>
    )
}

export default UnitsAndSelectorsPage
