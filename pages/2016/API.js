import React from 'react'
import DocumentTitle from 'react-document-title'

import parseCSV from '../../helpers/parseCSV.js'

import StackedBlock from '../../components/blocks/StackedBlock.js'
import VerticalBlock from '../../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../../components/blocks/SectionHeatmapBlock.js'
import Pagination from '../../components/Pagination.js'
import PageTitle from '../../components/PageTitle.js'

import api from '../../data/api/results.csv'
import apiOther from '../../data/api/other.csv'
import apiHappiness from '../../data/api/happiness.csv'

import Dummy from '../../contents/dummy.md'

const section = 'api'
const title = 'API Layers'
const items = ['REST API', 'Firebase', 'GraphQL', 'Apollo', 'Falcor', 'Horizon']

const API = () =>
  <DocumentTitle title={title}>
    <div className="results-container">
      <PageTitle title={title} currentSection={section} />
      <StackedBlock data={parseCSV(api)} contents={Dummy} section={section} />
      <SectionHeatmapBlock
        rows={items}
        contents={Dummy}
        title="How likely are API layer users to also use other technologies?"
      />
      <VerticalBlock data={parseCSV(apiOther)} contents={Dummy} title="Other API Layers (Mentions)" />
      <HorizontalBlock data={parseCSV(apiHappiness)} contents={Dummy} title="On a scale of 1 to 5, how happy are you with your current API layer solution?" />
      <Pagination currentSection="api" />
    </div>
  </DocumentTitle>

export default API
