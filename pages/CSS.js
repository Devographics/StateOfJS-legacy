import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../helpers/parseCSV.js'

import StackedBlock from '../components/blocks/StackedBlock.js'
import VerticalBlock from '../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../components/blocks/HorizontalBlock.js'
import HeatmapBlock from '../components/blocks/HeatmapBlock.js'

import stacked from '../data/css.csv'
import other from '../data/cssOther.csv'
import happiness from '../data/cssHappiness.csv'
import heatmapData from '../data/heatmap2.js'

import Dummy from '../contents/dummy.md'

import '../stylesheets/screen.scss'

const CSS = () =>
  <DocumentTitle title="CSS">
    <div className="results-container">
      <StackedBlock data={parseCSV(stacked)} contents={Dummy} title="CSS" />
      <VerticalBlock data={parseCSV(other)} contents={Dummy} title="Other CSS" />
      <HorizontalBlock data={parseCSV(happiness)} contents={Dummy} title="Happiness" />
      <HeatmapBlock data={heatmapData} contents={Dummy} title="Heatmap" />
    </div>
  </DocumentTitle>

export default CSS
