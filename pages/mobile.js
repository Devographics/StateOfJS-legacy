import React from 'react'
import DocumentTitle from 'react-document-title'

import StackedBlock from '../components/blocks/StackedBlock.js'
import HorizontalBlock from '../components/blocks/HorizontalBlock.js'
import HeatmapBlock from '../components/blocks/HeatmapBlock.js'

import mobile from '../data/mobile.csv'
import mobileOther from '../data/mobileOther.csv'
import heatmapData from '../data/heatmap2.js'

import Dummy from '../contents/dummy.md'

import '../stylesheets/screen.scss'

const Testing = () =>
  <DocumentTitle title="Results">
    <div className="results-container">
      <StackedBlock data={mobile} contents={Dummy} title="Testing Frameworks" />
      <HorizontalBlock data={mobileOther} contents={Dummy} title="Other Testing Tools" />
      <HeatmapBlock data={heatmapData} contents={Dummy} title="Heatmap" />
    </div>
  </DocumentTitle>

export default Testing
