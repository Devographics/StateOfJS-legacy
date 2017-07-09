import React from 'react'
import _ from 'lodash'
import MarkdownIt from 'markdown-it'

import sponsors from '../../../data/sponsors.yaml'

const md = new MarkdownIt()

const SponsorsBlock = (props) => {

  return (
    <div className="sponsors-list">
      {_.map(sponsors, sponsor => 
        <div className="sponsor" key={sponsor.name}>
          <div className="sponsor-image">
            <div><img src={`/images/sponsors/${sponsor.image}`} /></div>
          </div>
          <div className="sponsor-contents">
            <h4 className="sponsor-title"><a href={sponsor.url}>{sponsor.name}</a></h4>
            <div className="sponsor-description" dangerouslySetInnerHTML={{ __html: md.render(sponsor.description) }} />
          </div>
        </div>
      )}
    </div>
  )
}

SponsorsBlock.propTypes = {
  section: React.PropTypes.string,
}

export default SponsorsBlock
