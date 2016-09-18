import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../../helpers/parseCSV.js'

import StackedBlock from '../../components/blocks/StackedBlock.js'
// import VerticalBlock from '../../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../../components/blocks/SectionHeatmapBlock.js'
import Pagination from '../../components/Pagination.js'
import PageTitle from '../../components/PageTitle.js'

import stacked from '../../data/fullstack/results.csv'
// import other from '../../data/fullstack/other.csv'
import happiness from '../../data/fullstack/happiness.csv'

import Dummy from '../../contents/dummy.md'

const section = 'fullstack'
const title = 'Full Stack'
const items = ['Meteor', 'FeathersJS', 'DoneJS', 'MERN', 'MEAN']

const FullStack = () =>
  <DocumentTitle title={title}>
    <div className="results-container">
      <PageTitle title={title} currentSection={section} />
      <StackedBlock data={parseCSV(stacked)} contents={Dummy} title="Full Stack" />
      {/*<VerticalBlock data={parseCSV(other)} contents={Dummy} title="Other Full Stack" />*/}
      <HorizontalBlock data={parseCSV(happiness)} contents={Dummy} title="On a scale of 1 to 5, how happy are you with your current full-stack solution?" />
      <SectionHeatmapBlock
        rows={items}
        contents={Dummy}
        title="How likely are full-stack framework users to also want to use other technologies?"
      />
      <Pagination currentSection={section} />
    </div>
  </DocumentTitle>

export default FullStack
