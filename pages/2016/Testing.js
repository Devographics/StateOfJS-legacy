import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../../helpers/parseCSV.js'

import StackedBlock from '../../components/blocks/StackedBlock.js'
import VerticalBlock from '../../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../../components/blocks/SectionHeatmapBlock.js'
import Pagination from '../../components/Pagination.js'
import PageTitle from '../../components/PageTitle.js'

import testing from '../../data/testing/results.csv'
import testingOther from '../../data/testing/other.csv'
import testingHappiness from '../../data/testing/happiness.csv'

import TestingContents from '../../contents/testing.md'
import Dummy from '../../contents/dummy.md'

const section = 'testing'
const title = 'Testing'
const items = ['Mocha', 'Jasmine', 'Enzyme', 'Jest', 'Cucumber', 'Ava']

const Testing = () =>
  <DocumentTitle title={title}>
    <div className="results-container">
      <PageTitle title={title} currentSection={section} />
      <StackedBlock data={parseCSV(testing)} contents={TestingContents} section={section} />
      <VerticalBlock data={parseCSV(testingOther)} contents={Dummy} title="Other Testing Tools" />
      <HorizontalBlock data={parseCSV(testingHappiness)} contents={Dummy} title="On a scale of 1 to 5, how happy are you with your current testing solution?" />
      <SectionHeatmapBlock
        rows={items}
        contents={Dummy}
        title="How likely are testing framework users to also use other technologies?"
      />
      <Pagination currentSection={section} />
    </div>
  </DocumentTitle>

export default Testing
