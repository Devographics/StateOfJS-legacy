import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../../helpers/parseCSV.js'

import StackedBlock from '../../components/blocks/StackedBlock.js'
import VerticalBlock from '../../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../../components/blocks/SectionHeatmapBlock.js'

import stacked from '../../data/statemanagement/results.csv'
import other from '../../data/statemanagement/other.csv'
import happiness from '../../data/statemanagement/happiness.csv'

import Dummy from '../../contents/dummy.md'

import '../../stylesheets/screen.scss'

const items = ['Redux', 'MobX', 'Relay']

const StateManagement = () =>
  <DocumentTitle title="State Management">
    <div className="results-container">
      <StackedBlock data={parseCSV(stacked)} contents={Dummy} title="State Management" />
      <VerticalBlock data={parseCSV(other)} contents={Dummy} title="Other State Management" />
      <HorizontalBlock data={parseCSV(happiness)} contents={Dummy} title="Happiness" />
      <SectionHeatmapBlock
        rows={items}
        contents={Dummy}
        title="Heatmap"
        chartTitle="How likely is a state management library user to also want to use other technologies?"
      />
    </div>
  </DocumentTitle>

export default StateManagement
