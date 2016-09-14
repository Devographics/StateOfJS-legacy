import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../../helpers/parseCSV.js'

import StackedBlock from '../../components/blocks/StackedBlock.js'
import VerticalBlock from '../../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../../components/blocks/SectionHeatmapBlock.js'

import stacked from '../../data/css/results.csv'
import other from '../../data/css/other.csv'
import happiness from '../../data/css/happiness.csv'

import Dummy from '../../contents/dummy.md'

import '../../stylesheets/screen.scss'

const items = ['Plain CSS', 'SASS/SCSS', 'LESS', 'CSS Modules', 'Aphrodite']

const CSS = () =>
  <DocumentTitle title="CSS">
    <div className="results-container">
      <StackedBlock data={parseCSV(stacked)} contents={Dummy} title="CSS" />
      <VerticalBlock data={parseCSV(other)} contents={Dummy} title="Other CSS" />
      <HorizontalBlock data={parseCSV(happiness)} contents={Dummy} title="Happiness" />
      <SectionHeatmapBlock
        rows={items}
        contents={Dummy}
        title="Heatmap"
        chartTitle="How likely is a CSS technology user to also want to use other technologies?"
      />
    </div>
  </DocumentTitle>

export default CSS
