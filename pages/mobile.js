import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../helpers/parseCSV.js'

import StackedBlock from '../components/blocks/StackedBlock.js'
import VerticalBlock from '../components/blocks/VerticalBlock.js'
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
      <StackedBlock data={parseCSV(mobile)} contents={Dummy} title="Mobile Frameworks" />
      <VerticalBlock data={parseCSV(mobileOther)} contents={Dummy} title="Other Mobile Frameworks" />
      <HeatmapBlock data={heatmapData} contents={Dummy} title="Heatmap" />
      <HorizontalBlock data={parseCSV(mobileOther)} contents={Dummy} title="Happiness" />
    </div>
  </DocumentTitle>

export default Testing
