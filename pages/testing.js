import React from 'react'
import DocumentTitle from 'react-document-title'

import StackedBlock from '../components/blocks/StackedBlock.js'
import HorizontalBlock from '../components/blocks/HorizontalBlock.js'
import HeatmapBlock from '../components/blocks/HeatmapBlock.js'

import testing from '../data/testing.csv'
import testingOther from '../data/testingOther.csv'
import heatmapData from '../data/heatmap2.js'

import TestingContents from '../contents/testing.md'
import Dummy from '../contents/dummy.md'

import '../stylesheets/screen.scss'

const Testing = () =>
  <DocumentTitle title="Results">
    <div className="results-container">
      <StackedBlock data={testing} contents={TestingContents} title="Testing Frameworks" />
      <HorizontalBlock data={testingOther} contents={Dummy} title="Other Testing Tools" />
      <HeatmapBlock data={heatmapData} contents={Dummy} title="Heatmap" />
    </div>
  </DocumentTitle>

export default Testing
