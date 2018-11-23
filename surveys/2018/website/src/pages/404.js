import React from 'react'
import Layout from 'core/Layout'
import TextBlock from 'core/blocks/TextBlock'
import locales from '../../../config/locales.yml'

const defaultLocale = locales.find(l => l.path === 'default')

const NotFound = ({ location }) => (
    <Layout
        location={location}
        pageContext={{
            locale: defaultLocale.locale,
            localePath: ''
        }}
        showPagination={false}
    >
        <div>
            <TextBlock text={`404 not found`} />
        </div>
    </Layout>
)

export default NotFound
