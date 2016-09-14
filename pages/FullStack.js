import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../helpers/parseCSV.js'

import StackedBlock from '../components/blocks/StackedBlock.js'
// import VerticalBlock from '../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../components/blocks/SectionHeatmapBlock.js'

import stacked from '../data/fullstack.csv'
// import other from '../data/fullstackOther.csv'
import happiness from '../data/fullstackHappiness.csv'

import Dummy from '../contents/dummy.md'

import '../stylesheets/screen.scss'

const items = ['Meteor', 'FeathersJS', 'DoneJS', 'MERN', 'MEAN']

const FullStack = () =>
  <DocumentTitle title="Full Stack">
    <div className="results-container">
      <StackedBlock data={parseCSV(stacked)} contents={Dummy} title="Full Stack" />
      {/*<VerticalBlock data={parseCSV(other)} contents={Dummy} title="Other Full Stack" />*/}
      <HorizontalBlock data={parseCSV(happiness)} contents={Dummy} title="Happiness" />
      <SectionHeatmapBlock
        rows={items}
        contents={Dummy}
        title="Heatmap"
        chartTitle="How likely is a full-stack framework user to also want to use other technologies?"
      />
    </div>
  </DocumentTitle>

export default FullStack
