import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../helpers/parseCSV.js'

import StackedBlock from '../components/blocks/StackedBlock.js'
import VerticalBlock from '../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../components/blocks/HorizontalBlock.js'
import HeatmapBlock from '../components/blocks/HeatmapBlock.js'

import frontend from '../data/frontend.csv'
import frontendOther from '../data/frontendOther.csv'
import frontendHappiness from '../data/frontendHappiness.csv'
import heatmapData from '../data/heatmap2.js'

import Dummy from '../contents/dummy.md'

import '../stylesheets/screen.scss'

const Frontend = () =>
  <DocumentTitle title="Results">
    <div className="results-container">
      <StackedBlock data={parseCSV(frontend)} contents={Dummy} title="Front-end Frameworks" />
      <VerticalBlock data={parseCSV(frontendOther)} contents={Dummy} title="Other Front-end Frameworks" />
      <HorizontalBlock data={parseCSV(frontendHappiness)} contents={Dummy} title="Happiness" />
      <HeatmapBlock data={heatmapData} contents={Dummy} title="Heatmap" />
    </div>
  </DocumentTitle>

export default Frontend
