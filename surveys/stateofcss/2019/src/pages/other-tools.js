import React from 'react'
import TextBlock from '../core/blocks/TextBlock'
import PageHeader from '../core/pages/PageHeader'

const OtherToolsPage = ({ data }) => (
    <>
        <PageHeader showIntro={false} />
        <TextBlock text="@todo" />
        <p>TODO: Text Editors</p>
        <p>TODO: Browsers</p>
    </>
)

export default OtherToolsPage
