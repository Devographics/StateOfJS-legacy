import React from 'react'
import PropTypes from 'prop-types'
import find from 'lodash/find'
import Helmet from 'react-helmet'
import slugify from '../../helpers/slugify'
import getPageUrl from '../../helpers/getPageUrl'
import nav from '../../data/nav.yaml'

const Meta = ({ section, subSection }) => {
    console.log(section)
    const currentSection = find(nav, { label: section })
    const sectionSlugA = slugify(section)
    const sectionSlugB = slugify(section, true)
    const subSectionSlug = subSection

    const url = getPageUrl(sectionSlugA, subSectionSlug)
    const image = `http://stateofjs.com/images/captures/${sectionSlugB}_${subSectionSlug}.png`
    const metaTitle = `State Of JavaScript Survey Results: ${currentSection.fullLabel}`
    const metaDescription = `Find out which ${
        currentSection.label
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
    section: PropTypes.string.isRequired,
    subSection: PropTypes.string.isRequired
}

export default Meta
