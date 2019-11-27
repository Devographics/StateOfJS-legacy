import React from 'react'
import qs from 'qs'

const TakeSurvey = ({ location = {} }) => {

  const query = qs.parse(location.search, { ignoreQueryPrefix: true, decoder: (c) => c })
  const { source } = query

  return (
    <div className="take-survey">
        <a className="button large-button" href={`https://survey.stateofjs.com/${source ? `?source=${source}`: ''}`}>
            Take Survey
        </a>

        <p className="take-survey-note">
            Note: to improve results relevance, we keep track of data such as your referrer,
            location, device, browser, and OS.
        </p>
    </div>
)}

export default TakeSurvey