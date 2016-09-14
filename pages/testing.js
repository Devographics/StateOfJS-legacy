import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../helpers/parseCSV.js'

import StackedBlock from '../components/blocks/StackedBlock.js'
import VerticalBlock from '../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../components/blocks/SectionHeatmapBlock.js'

import testing from '../data/testing.csv'
import testingOther from '../data/testingOther.csv'
import testingHappiness from '../data/testingHappiness.csv'

import TestingContents from '../contents/testing.md'
import Dummy from '../contents/dummy.md'

import '../stylesheets/screen.scss'

const items = ['Mocha', 'Jasmine', 'Enzyme', 'Jest', 'Cucumber', 'Ava']

const Testing = () =>
  <DocumentTitle title="Results">
    <div className="results-container">
      <StackedBlock data={parseCSV(testing)} contents={TestingContents} title="Testing Frameworks" />
      <VerticalBlock data={parseCSV(testingOther)} contents={Dummy} title="Other Testing Tools" />
      <HorizontalBlock data={parseCSV(testingHappiness)} contents={Dummy} title="Happiness" />
      <SectionHeatmapBlock
        rows={items}
        contents={Dummy}
        title="Heatmap"
        chartTitle="How likely is a testing framework user to also want to use other technologies?"
      />    
    </div>
  </DocumentTitle>

export default Testing
