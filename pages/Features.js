import React from 'react'
import DocumentTitle from 'react-document-title'
import _ from 'lodash'

import parseCSV from '../helpers/parseCSV.js'

import HorizontalBlock from '../components/blocks/HorizontalBlock.js'
import VerticalBlock from '../components/blocks/VerticalBlock.js'

import features from '../data/features.csv'
import featuresScores from '../data/featuresScores.csv'

import Dummy from '../contents/dummy.md'

import '../stylesheets/screen.scss'

const Features = () =>
  <DocumentTitle title="Features">
    <div className="results-container">
      {features.map(feature => {
        const featureTitle = feature.Option
        delete feature.Option

        const dataArray = parseCSV(_.keys(feature).map(key => ({ Option: key, Value: feature[key] })))

        return (
          <HorizontalBlock
            key={featureTitle}
            data={dataArray}
            contents={Dummy}
            title="Happiness"
            chartTitle={`How important is ${featureTitle} to you?`} 
          />
        )
      })}
      <VerticalBlock data={parseCSV(featuresScores)} contents={Dummy} title="Other Frameworks" chartTitle="Highest-rated Features" />
    </div>
  </DocumentTitle>

export default Features
