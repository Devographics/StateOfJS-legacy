import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../helpers/parseCSV.js'

import StackedBlock from '../components/blocks/StackedBlock.js'
import VerticalBlock from '../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../components/blocks/HorizontalBlock.js'
import HeatmapBlock from '../components/blocks/HeatmapBlock.js'

import stacked from '../data/statemanagement.csv'
import other from '../data/statemanagementOther.csv'
import happiness from '../data/statemanagementHappiness.csv'
import heatmapData from '../data/heatmapPhi.csv'

import Dummy from '../contents/dummy.md'

import '../stylesheets/screen.scss'

const items = ['Redux', 'MobX', 'Relay']

const StateManagement = () =>
  <DocumentTitle title="State Management">
    <div className="results-container">
      <StackedBlock data={parseCSV(stacked)} contents={Dummy} title="State Management" />
      <VerticalBlock data={parseCSV(other)} contents={Dummy} title="Other State Management" />
      <HorizontalBlock data={parseCSV(happiness)} contents={Dummy} title="Happiness" />
      <HeatmapBlock items={items} data={heatmapData} contents={Dummy} title="Heatmap" />
    </div>
  </DocumentTitle>

export default StateManagement
