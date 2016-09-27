import React from 'react'
import classNames from 'classnames'

import TweetWidget from '../common/TweetWidget.js'
import TwitterTimeline from '../common/TwitterTimeline.js'

import Sections from '../../data/sections.yaml'

const TwitterBlock = props => {
  const section = _.find(Sections, { slug: props.section })
  const url = `http://stateofjs.com/2016/${section.slug}/`
  const text = `The State Of JavaScript: interesting survey results about ${section.name}`

  return (
    <div className={classNames('section', 'section-layout-b', props.className)}>
      <div className="section-contents-wide twitter-block">
        <h2>Join the Conversation!</h2>
        <div className="twitter-timeline-wrapper">
          <TweetWidget text={text} url={url} hashtag="stateofjs"/>
          <TwitterTimeline
            query={encodeURIComponent(url)}
            widgetId="780605416333910017"
          />
        </div>
      </div>
    </div>
  )
}

TwitterBlock.propTypes = {
  section: React.PropTypes.string,
  className: React.PropTypes.string,
}

export default TwitterBlock
