import React from 'react'
import PropTypes from 'prop-types'
import sponsors from '../../data/sponsors.yaml'
import Link from 'gatsby-link'

const SponsorsBlock = () => (
    <div className="Sponsors__Wrapper">
        <div className="Sponsors">
            <h3 className="Sponsors__Heading">Our 2018 Partners:</h3>
            <div className="Sponsors__Items">
                {sponsors.map(({ name, image, url }) => (
                    <div className="Sponsors__Item" key={name}>
                        <a href={url}>
                            <img title={name} src={`/images/sponsors/${image}`} />
                        </a>
                    </div>
                ))}
            </div>
        </div>
        <Link className="Sponsors__Support" to="/support">
            Become a partner
        </Link>
    </div>
)

SponsorsBlock.propTypes = {
    section: PropTypes.string
}

export default SponsorsBlock
