import React from 'react'
import ResultsBlock from '../blocks/ResultsBlock'
import NumberOfLibrariesBlock from '../blocks/NumberOfLibrariesBlock'
import ResourcesBlock from '../blocks/ResourcesBlock'
import TextBlock from '../blocks/TextBlock'
import nav from '../../data/nav.yaml'
import find from 'lodash/find'
import Helmet from 'react-helmet'
import slugify from '../../helpers/slugify'

const Meta = ({ section, subSection }) => {
	
    const currentSection = find(nav.items, {label: section })
    const sectionSlug = slugify(section)
    const subSectionSlug = subSection

    const image = `http://stateofjs.com/images/captures/${sectionSlug}_${subSectionSlug}.png`
    const url = `http://stateofjs.com/2017/${sectionSlug}/${subSectionSlug}`
    const metaTitle = `State Of JavaScript Survey Results: ${currentSection.fullLabel}`
    const metaDescription = `Find out which ${currentSection.label} JavaScript tools and frameworks are the most popular.`

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
        { name: 'twitter:description', content: metaDescription },
    ]

	return <Helmet meta={meta} />
}

export default Meta
