import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import getPageUrl from '../../helpers/getPageUrl'
import withPageData from '../../helpers/withPageData'

const Meta = ({ currentPage }) => {
    const { section, subSection } = currentPage
    const url = getPageUrl(currentPage, true)
    const image = `http://stateofjs.com/images/captures/${section.slug}_${subSection.slug}.png`
    const metaTitle = `State Of JavaScript Survey Results: ${currentPage.title}`
    const metaDescription = `Find out which ${
        currentPage.label
    } JavaScript tools and frameworks are the most popular.`

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
