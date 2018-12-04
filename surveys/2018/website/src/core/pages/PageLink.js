import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import { PageContextConsumer } from './pageContext'

const PageLink = ({ page, ...rest }) => (
    <PageContextConsumer>
        {context => {
            return <Link {...rest} to={`${context.localePath}${page.path || page.basePath}`} />
        }}
    </PageContextConsumer>
)

PageLink.propTypes = {
    page: PropTypes.shape({
        basePath: PropTypes.string,
        path: PropTypes.string
    }).isRequired
}

export default PageLink
