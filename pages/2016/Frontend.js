import React from 'react'
import DocumentTitle from 'react-document-title'
import _ from 'lodash'

import parseCSV from '../../helpers/parseCSV.js'

import StackedBlock from '../../components/blocks/StackedBlock.js'
import VerticalBlock from '../../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../../components/blocks/SectionHeatmapBlock.js'
import Pagination from '../../components/Pagination.js'
import PageTitle from '../../components/PageTitle.js'

import frontend from '../../data/frontend/results.csv'
import frontendOther from '../../data/frontend/other.csv'
import frontendHappiness from '../../data/frontend/happiness.csv'

import results from '../../data/frontend/results.md'
import other from '../../data/frontend/other.md'
import happiness from '../../data/frontend/happiness.md'
import heatmap from '../../data/frontend/heatmap.md'

const section = 'frontend'
const title = 'Front-End Frameworks'
const items = ['No Framework', 'React', 'Angular', 'Angular 2', 'Ember', 'Vue', 'Backbone']

const Frontend = () =>
  <DocumentTitle title={title}>
    <div className="results-container">
      <PageTitle title={title} currentSection={section} />
      <StackedBlock data={parseCSV(frontend)} contents={results} />
      <VerticalBlock data={parseCSV(frontendOther)} contents={other} title="Other Front-End Frameworks (Mentions)" chartTitle="Other Front-end Frameworks" />
      <HorizontalBlock data={parseCSV(frontendHappiness)} contents={happiness} title="On a scale of 1 to 5, how happy are you with your current solution for the front-end?" />
      <SectionHeatmapBlock
        rows={items}
        contents={heatmap}
        title="How likely are front-end framework users to also want to use other technologies?"
      />
      <Pagination currentSection="frontend" />
    </div>
  </DocumentTitle>

export default Frontend
