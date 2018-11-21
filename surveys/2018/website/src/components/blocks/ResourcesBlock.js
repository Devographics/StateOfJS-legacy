import React from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import Link from 'gatsby-link'
import resources from '../../data/resources.yaml'
import BlockTitle from '../elements/BlockTitle'

const trackClick = (tool, resource, label) => {
    ReactGA.event({
        category: 'Sponsor Clicks',
        action: `${tool}: ${resource.name}`,
        label
    })
}

const ResourcesBlock = ({ tool }) => {
    const sectionResources = resources.filter(r => r.tool === tool)

    if (!sectionResources.length) {
        return null
    }

    return (
        <div className="block block--resources">
            <div className="resources">
                <BlockTitle title="Recommended Resources" />
                {/*
                <div className="resources-title">
                    <h2>Recommended Resources</h2>
                    <span className="resources-sponsor">
                        Presented by <a href="http://wesbos.com/">Wes Bos</a>
                    </span>
                </div>
                */}
                <div className="resources-list">
                    {sectionResources.map(resource => {
                        const url = resource.url.includes('utm_source') ? resource.url : `${
                            resource.url
                        }?utm_source=stateofjs&utm_medium=sponsor&utm_campaign=${tool}`

                        return (
                            <div key={resource.name} className="resource">
                                <div className="resource-image">
                                    <div>
                                        {/* eslint-disable-next-line */}
                                        <a
                                            onClick={() => trackClick(tool, resource, 'text')}
                                            href={`${url}&utm_content=textlink`}
                                            style={{
                                                backgroundImage: `url(/images/resources/${
                                                    resource.image
                                                })`
                                            }}
                                            title={resource.name}
                                        />
                                    </div>
                                </div>
                                <div className="resource-contents">
                                    <h4 className="resource-title">
                                        <a
                                            onClick={() => trackClick(tool, resource, 'text')}
                                            href={`${url}&utm_content=textlink`}
                                        >
                                            {resource.name}
                                        </a>
                                    </h4>
                                    {/*
                                    <h5 className="resource-author">{resource.author}</h5>
                                    */}
                                    <div className="resource-description">
                                        {resource.description}
                                    </div>
                                </div>
                                {/*
                                <div className="resource-play">
                                    <a
                                        onClick={() => trackClick(section, resource, 'play')}
                                        href={`${url}&utm_content=playlink`}
                                    >
                                        <PlaySVG />
                                    </a>
                                </div>
                                */}
                            </div>
                        )
                    })}
                </div>
                <div className="resources-sponsored">
                    Thanks to our partners for supporting this project.&nbsp;
                    <Link to="/support">Learn more</Link> about supporting The State of JS.
                </div>
            </div>
        </div>
    )
}

ResourcesBlock.propTypes = {
    section: PropTypes.string
}

export default ResourcesBlock
