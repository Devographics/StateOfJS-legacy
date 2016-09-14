import React from 'react'
import DocumentTitle from 'react-document-title'
import _ from 'lodash'

import parseCSV from '../helpers/parseCSV.js'

import HorizontalBlock from '../components/blocks/HorizontalBlock.js'

import features from '../data/features.csv'
import frontendHappiness from '../data/frontendHappiness.csv'

import Dummy from '../contents/dummy.md'

import '../stylesheets/screen.scss'

console.log(features)
console.log(frontendHappiness)

const Features = () =>
  <DocumentTitle title="Features">
    <div className="results-container">
      {features.map(feature => {
        const featureTitle = feature["Option"]
        delete feature["Option"]
        const dataArray = parseCSV(_.keys(feature).map(key => {
          return {Option: key, Value: feature[key]}
        }))
        console.log(dataArray)
        return <HorizontalBlock 
          key={featureTitle} 
          data={dataArray} 
          contents={Dummy} 
          title="Happiness" 
          chartTitle={`How important is ${featureTitle} to you?`} 
        />
      })}
    </div>
  </DocumentTitle>

export default Features
