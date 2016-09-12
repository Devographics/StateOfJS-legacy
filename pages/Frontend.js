import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../helpers/parseCSV.js'

import StackedBlock from '../components/blocks/StackedBlock.js'
import VerticalBlock from '../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../components/blocks/HorizontalBlock.js'
import HeatmapBlock from '../components/blocks/HeatmapBlock.js'

import frontend from '../data/frontend.csv'
import frontendOther from '../data/frontendOther.csv'
import frontendHappiness from '../data/frontendHappiness.csv'
import heatmapData from '../data/heatmapPhi.csv'

import results from '../contents/frontend/results.md'
import other from '../contents/frontend/other.md'
import happiness from '../contents/frontend/happiness.md'
import heatmap from '../contents/frontend/heatmap.md'

import '../stylesheets/screen.scss'

const items = ['No Framework', 'React', 'Angular', 'Angular 2', 'Ember', 'Vue', 'Backbone']

const Frontend = () =>
  <DocumentTitle title="Results">
    <div className="results-container">
      <StackedBlock data={parseCSV(frontend)} contents={results} title="Front-end Frameworks" />
      <VerticalBlock data={parseCSV(frontendOther)} contents={other} title="Other Frameworks" chartTitle="Other Front-end Frameworks" />
      <HorizontalBlock data={parseCSV(frontendHappiness)} contents={happiness} title="Happiness" chartTitle="On a scale of 1 to 5, how happy are you with your current solution for the front-end?" />
      <HeatmapBlock items={items} data={heatmapData} contents={heatmap} title="Heatmap" chartTitle="How likely is a front-end framework user to also want to use other technologies?" />
    </div>
  </DocumentTitle>

export default Frontend
