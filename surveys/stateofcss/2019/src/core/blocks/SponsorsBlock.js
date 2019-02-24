import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import sponsors from 'data/sponsors.yaml'
import { I18nContext } from 'core/i18n/i18nContext'

const SponsorsBlock = () => {
    const { translate } = useContext(I18nContext)

    return (
        <div className="Sponsors__Wrapper">
            <div className="Sponsors">
                <h3 className="Sponsors__Heading">{translate('partners.premium_partners')}:</h3>
                <div className="Sponsors__Items">
                    {sponsors.map(({ name, image, url }) => (
                        <div className="Sponsors__Item" key={name}>
                            <a href={url}>
                                <img title={name} alt="" src={`/images/sponsors/${image}`} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <Link className="Sponsors__Support" to="/support">
                {translate('partners.become_partner')}
            </Link>
        </div>
    )
}

SponsorsBlock.propTypes = {
    section: PropTypes.string
}

export default SponsorsBlock
