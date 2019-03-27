import React from 'react'
import TextBlock from '../core/blocks/TextBlock'
import PageHeader from '../core/pages/PageHeader'

const FeaturesPage = ({ data }) => (
    <>
        <PageHeader showIntro={false} />
        <TextBlock text="@todo" />
        <TextBlock text="@todo top 20 most used features" />
        <TextBlock text="@todo top 20 least used features" />
    </>
)

export default FeaturesPage
