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

import dummy from '../contents/dummy.md'
import results from '../contents/frontend/results.md'
import other from '../contents/frontend/other.md'
import happiness from '../contents/frontend/happiness.md'

import '../stylesheets/screen.scss'

const Frontend = () =>
  <DocumentTitle title="Results">
    <div className="results-container">
      <StackedBlock data={parseCSV(frontend)} contents={results} title="Front-end Frameworks" />
      <VerticalBlock data={parseCSV(frontendOther)} contents={other} title="Other Front-end Frameworks" />
      <HorizontalBlock data={parseCSV(frontendHappiness)} contents={happiness} title="Happiness" />
      {/*<HeatmapBlock data={heatmapData} contents={dummy} title="Heatmap" />*/}
    </div>
  </DocumentTitle>

export default Frontend
