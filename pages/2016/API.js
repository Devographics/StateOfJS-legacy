import React from 'react'
import DocumentTitle from 'react-document-title'

import parseCSV from '../../helpers/parseCSV.js'

import StackedBlock from '../../components/blocks/StackedBlock.js'
import VerticalBlock from '../../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../../components/blocks/SectionHeatmapBlock.js'
import Pagination from '../../components/Pagination.js'
import PageTitle from '../../components/PageTitle.js'
import AuthorBlock from '../../components/blocks/AuthorBlock.js'
import TLDRBlock from '../../components/blocks/TLDRBlock.js'
import TwitterBlock from '../../components/blocks/TwitterBlock.js'

import api from '../../data/api/results.csv'
import apiOther from '../../data/api/other.csv'
import apiHappiness from '../../data/api/happiness.csv'

import results from '../../data/api/results.md'
import other from '../../data/api/other.md'
import happiness from '../../data/api/happiness.md'
import heatmap from '../../data/api/heatmap.md'
import tldr from '../../data/api/tldr.md'


const section = 'api'
const title = 'API Layers'
const items = ['REST API', 'Firebase', 'GraphQL', 'Apollo', 'Falcor', 'Horizon']

const API = () =>
  <DocumentTitle title={title}>
    <div className="results-container">
      <PageTitle section={section} />
      <TLDRBlock contents={tldr} />
      <StackedBlock 
        data={parseCSV(api)}
        contents={results}
        section={section}
        title={title}
      />
      <SectionHeatmapBlock
        rows={items}
        contents={heatmap}
        title="How likely are API layer users to also use other technologies?"
      />
      <VerticalBlock data={parseCSV(apiOther)} contents={other} title="Other API Layers (Mentions)" />
      <HorizontalBlock data={parseCSV(apiHappiness)} contents={happiness} title="On a scale of 1 to 5, how happy are you with your current API layer solution?" />
      <AuthorBlock section={section} />
      <Pagination section="api" />
      <TwitterBlock section={section} />
    </div>
  </DocumentTitle>

export default API
