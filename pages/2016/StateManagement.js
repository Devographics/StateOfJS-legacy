import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../../helpers/parseCSV.js'

import StackedBlock from '../../components/blocks/StackedBlock.js'
import VerticalBlock from '../../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../../components/blocks/SectionHeatmapBlock.js'
import Pagination from '../../components/Pagination.js'
import PageTitle from '../../components/PageTitle.js'

import stacked from '../../data/statemanagement/results.csv'
import other from '../../data/statemanagement/other.csv'
import happiness from '../../data/statemanagement/happiness.csv'

import Dummy from '../../contents/dummy.md'

const section = 'statemanagement'
const title = 'State Management'
const items = ['Redux', 'MobX', 'Relay']

const StateManagement = () =>
  <DocumentTitle title={title}>
    <div className="results-container">
      <PageTitle title={title} currentSection={section} />
      <StackedBlock data={parseCSV(stacked)} contents={Dummy} />
      <VerticalBlock data={parseCSV(other)} contents={Dummy} title="Other State Management Frameworks (Mentions)" />
      <HorizontalBlock data={parseCSV(happiness)} contents={Dummy} title="On a scale of 1 to 5, how happy are you with your current solution for state management?" />
      <SectionHeatmapBlock
        rows={items}
        contents={Dummy}
        title="How likely are state management library users to also want to use other technologies?"
      />
      <Pagination currentSection="statemanagement" />
    </div>
  </DocumentTitle>

export default StateManagement
