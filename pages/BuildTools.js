import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../helpers/parseCSV.js'

import StackedBlock from '../components/blocks/StackedBlock.js'
import VerticalBlock from '../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../components/blocks/HorizontalBlock.js'
import HeatmapBlock from '../components/blocks/HeatmapBlock.js'

import stacked from '../data/buildtools.csv'
import other from '../data/buildtoolsOther.csv'
import happiness from '../data/buildtoolsHappiness.csv'
import heatmapData from '../data/heatmap.csv'

import Dummy from '../contents/dummy.md'

import '../stylesheets/screen.scss'

const items = ['Webpack', 'Grunt', 'Gulp', 'Browserify']

const BuildTools = () =>
  <DocumentTitle title="Build Tools">
    <div className="results-container">
      <StackedBlock data={parseCSV(stacked)} contents={Dummy} title="Build Tools" />
      <VerticalBlock data={parseCSV(other)} contents={Dummy} title="Other Build Tools" />
      <HorizontalBlock data={parseCSV(happiness)} contents={Dummy} title="Happiness" />
      <HeatmapBlock items={items} data={heatmapData} contents={Dummy} title="Heatmap" />
    </div>
  </DocumentTitle>

export default BuildTools
