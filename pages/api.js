import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../helpers/parseCSV.js'

import StackedBlock from '../components/blocks/StackedBlock.js'
import VerticalBlock from '../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../components/blocks/SectionHeatmapBlock.js'

import api from '../data/api.csv'
import apiOther from '../data/apiOther.csv'
import apiHappiness from '../data/apiHappiness.csv'

import Dummy from '../contents/dummy.md'

import '../stylesheets/screen.scss'

const items = ['REST API', 'Firebase', 'GraphQL', 'Apollo', 'Falcor', 'Horizon']

const API = () =>
  <DocumentTitle title="Results">
    <div className="results-container">
      <StackedBlock data={parseCSV(api)} contents={Dummy} title="API Layers" />
      <VerticalBlock data={parseCSV(apiOther)} contents={Dummy} title="Other API Layers" />
      <HorizontalBlock data={parseCSV(apiHappiness)} contents={Dummy} title="Happiness" />
      <SectionHeatmapBlock
        rows={items}
        contents={Dummy}
        title="Heatmap"
        chartTitle="How likely is an API layer user to also want to use other technologies?"
      />
    </div>
  </DocumentTitle>

export default API
