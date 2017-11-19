import React from 'react'
import _ from 'lodash'
import ReactGA from 'react-ga'

import resources from '../../../data/resources.yaml'

const trackClick = (section, resource, label) => {
    ReactGA.event({
        category: 'Sponsor Clicks',
        action: `${section}: ${resource.name}`,
        label,
    })
}

// const MovieSVG = () => <svg version="1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M23.5 3H.5c-.276 0-.5.224-.5.5v17c0 .276.224.5.5.5h23c.276 0 .5-.224.5-.5v-17c0-.276-.224-.5-.5-.5zM16 18v2H8v-2h8zM1 17V7h22v10H1zM8 6V4h8v2H8zm15 0h-6V4h6v2zM1 4h6v2H1V4zm0 14h6v2H1v-2zm22 2h-6v-2h6v2zm-7.793-8.455l-5.5-2.5c-.154-.072-.334-.058-.478.035-.143.092-.229.25-.229.42v5c0 .17.086.328.229.42.082.053.176.08.271.08l.207-.045 5.5-2.5c.178-.081.293-.259.293-.455s-.115-.374-.293-.455zM10 13.724v-3.447L13.792 12 10 13.724z"/></svg>

const PlaySVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
        <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    </svg>
)

const renderSponsor = sponsor => {
    if (sponsor === 'reactforbeginners') {
        return (
            <span>
                <a href="https://reactforbeginners.com">React For Beginners</a> &{' '}
                <a href="https://egghead.io">
                    <img src="https://d1xwtr0qwr70yv.cloudfront.net/assets/elements/logo-mobile-0012236aa1a9766db6b0cc9705df19ec.svg" />Egghead.io
                </a>
            </span>
        )
    } else if (sponsor === 'es6') {
        return (
            <span>
                <a href="https://ES6.io/friend/STATEOFJS">ES6 For Everyone</a> &{' '}
                <a href="https://egghead.io">
                    <img src="https://d1xwtr0qwr70yv.cloudfront.net/assets/elements/logo-mobile-0012236aa1a9766db6b0cc9705df19ec.svg" />Egghead.io
                </a>
            </span>
        )
    } else {
        return (
            <span>
                <a href="https://egghead.io">
                    <img src="https://d1xwtr0qwr70yv.cloudfront.net/assets/elements/logo-mobile-0012236aa1a9766db6b0cc9705df19ec.svg" />Egghead.io
                </a>
            </span>
        )
    }
}

const ResourcesBlock = ({ section, sponsor }) => {
    const sectionResources = _.filter(resources, r => r.section === section)

    return (
        <div className="section section-layout-b">
            <div className="section-contents-wide resources">
                <div className="resources-title">
                    <h2>Recommended Resources</h2>
                    <span className="resources-sponsor">Presented by {renderSponsor(sponsor)}</span>
                </div>
                <div className="resources-list">
                    {_.map(sectionResources, resource => {
                        const url = `${
                            resource.url
                        }?utm_source=stateofjs&utm_medium=sponsor&utm_campaign=${section}`

                        return (
                            <div key={resource.name} className="resource">
                                <div className="resource-image">
                                    <div>
                                        <img src={`/images/resources/${resource.avatar}`} />
                                    </div>
                                </div>
                                <div className="resource-contents">
                                    <h4 className="resource-title">
                                        <a
                                            onClick={() => trackClick(section, resource, 'text')}
                                            href={`${url}&utm_content=textlink`}
                                        >
                                            {resource.name}
                                        </a>
                                    </h4>
                                    <h5 className="resource-author">{resource.author}</h5>
                                    <div className="resource-description">
                                        {resource.description}
                                    </div>
                                </div>
                                <div className="resource-play">
                                    <a
                                        onClick={() => trackClick(section, resource, 'play')}
                                        href={`${url}&utm_content=playlink`}
                                    >
                                        <PlaySVG />
                                    </a>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="resources-sponsored">
                    Thanks to our partners for supporting this project. Check them out for more
                    awesome programming courses!
                </div>
            </div>
        </div>
    )
}

ResourcesBlock.propTypes = {
    section: React.PropTypes.string,
}

export default ResourcesBlock
