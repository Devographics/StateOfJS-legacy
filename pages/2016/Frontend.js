import React from 'react'
import DocumentTitle from 'react-document-title'
import _ from 'lodash'

import parseCSV from '../../helpers/parseCSV.js'

import StackedBlock from '../../components/blocks/StackedBlock.js'
import VerticalBlock from '../../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../../components/blocks/SectionHeatmapBlock.js'

import frontend from '../../data/frontend/results.csv'
import frontendOther from '../../data/frontend/other.csv'
import frontendHappiness from '../../data/frontend/happiness.csv'

import results from '../../data/frontend/results.md'
import other from '../../data/frontend/other.md'
import happiness from '../../data/frontend/happiness.md'
import heatmap from '../../data/frontend/heatmap.md'

import '../../stylesheets/screen.scss'

const items = ['No Framework', 'React', 'Angular', 'Angular 2', 'Ember', 'Vue', 'Backbone']

const Frontend = () =>
  <DocumentTitle title="Results">
    <div className="results-container">
      <StackedBlock data={parseCSV(frontend)} contents={results} title="Front-end Frameworks" />
      <VerticalBlock data={parseCSV(frontendOther)} contents={other} title="Other Frameworks" chartTitle="Other Front-end Frameworks" />
      <HorizontalBlock data={parseCSV(frontendHappiness)} contents={happiness} title="Happiness" chartTitle="On a scale of 1 to 5, how happy are you with your current solution for the front-end?" />
      <SectionHeatmapBlock
        rows={items}
        contents={heatmap}
        title="Heatmap"
        chartTitle="How likely is a front-end framework user to also want to use other technologies?"
      />
    </div>
  </DocumentTitle>

export default Frontend
