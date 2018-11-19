import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import withPageData from '../../helpers/withPageData'
import getImageUrl from '../../helpers/getImageUrl'

const Meta = ({ currentPage, properties = {} }) => {
    const url = properties.url || currentPage.url
    const image = properties.image || getImageUrl(currentPage)
    const metaTitle = properties.title || `State Of JavaScript Survey Results: ${currentPage.title}`
    const metaDescription = properties.description || metaTitle

    const meta = [
        // facebook
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: url },
        { property: 'og:image', content: image },
        { property: 'og:title', content: metaTitle },
        { property: 'og:description', content: metaDescription },
        // twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image:src', content: image },
        { name: 'twitter:title', content: metaTitle },
        { name: 'twitter:description', content: metaDescription }
    ]

    return <Helmet meta={meta} />
}

Meta.propTypes = {
    currentPage: PropTypes.object.isRequired
}

export default withPageData(Meta)
