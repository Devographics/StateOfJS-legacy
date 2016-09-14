import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../../helpers/parseCSV.js'

import StackedBlock from '../../components/blocks/StackedBlock.js'
import VerticalBlock from '../../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../../components/blocks/SectionHeatmapBlock.js'

import stacked from '../../data/buildtools/results.csv'
import other from '../../data/buildtools/other.csv'
import happiness from '../../data/buildtools/happiness.csv'

import Dummy from '../../contents/dummy.md'

import '../../stylesheets/screen.scss'

const items = ['Webpack', 'Grunt', 'Gulp', 'Browserify']

const BuildTools = () =>
  <DocumentTitle title="Build Tools">
    <div className="results-container">
      <StackedBlock data={parseCSV(stacked)} contents={Dummy} title="Build Tools" />
      <VerticalBlock data={parseCSV(other)} contents={Dummy} title="Other Build Tools" />
      <HorizontalBlock data={parseCSV(happiness)} contents={Dummy} title="Happiness" />
      <SectionHeatmapBlock
        rows={items}
        contents={Dummy}
        title="Heatmap"
        chartTitle="How likely is a build tool user to also want to use other technologies?"
      />
    </div>
  </DocumentTitle>

export default BuildTools
