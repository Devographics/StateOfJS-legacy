import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ReactGA from 'react-ga'
import Link from 'gatsby-link'
import getWording from '../../helpers/getWording'

import resources from '../../../src/data/resources.yaml'

const trackClick = (section, resource, label) => {
    ReactGA.event({
        category: 'Sponsor Clicks',
        action: `${section}: ${resource.name}`,
        label
    })
}

const ResourcesBlock = ({ section }) => {
    const sectionResources = _.filter(resources, r => r.section === section)

    if (!sectionResources.length) {
        return null
    }

    return (
        <div className="block block--resources">
            <div className="resources">
                <div className="resources-title">
                    <h2>Recommended Resources</h2>
                    <span className="resources-sponsor">
                        Presented by <a href="http://wesbos.com/">Wes Bos</a>
                    </span>
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
                                        <a
                                            onClick={() => trackClick(section, resource, 'text')}
                                            href={`${url}&utm_content=textlink`}
                                        >
                                            <img
                                                alt={resource.name}
                                                src={`/images/resources/${resource.image}`}
                                            />
                                        </a>
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
