import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../../helpers/parseCSV.js'

import StackedBlock from '../../components/blocks/StackedBlock.js'
import VerticalBlock from '../../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../../components/blocks/SectionHeatmapBlock.js'
import AuthorBlock from '../../components/blocks/AuthorBlock.js'
import Pagination from '../../components/Pagination.js'
import PageTitle from '../../components/PageTitle.js'
import TLDRBlock from '../../components/blocks/TLDRBlock.js'
import TextBlock from '../../components/blocks/TextBlock.js'
import TwitterBlock from '../../components/blocks/TwitterBlock.js'

import testing from '../../data/testing/results.csv'
import testingOther from '../../data/testing/other.csv'
import testingHappiness from '../../data/testing/happiness.csv'

import tldrContents from '../../data/testing/tldr.md'
import introContents from '../../data/testing/intro.md'
import resultsContents from '../../data/testing/results.md'
import otherContents from '../../data/testing/other.md'
import happinessContents from '../../data/testing/happiness.md'
import heatmapContents from '../../data/testing/heatmap.md'

const section = 'testing'
const title = 'Testing'
const items = ['Mocha', 'Jasmine', 'Enzyme', 'Jest', 'Cucumber', 'Ava']

const Testing = () =>
  <DocumentTitle title={title}>
    <div className="results-container">
      <PageTitle title={title} section={section} />
      <TLDRBlock contents={tldrContents} />
      <TextBlock contents={introContents} />
      <StackedBlock
        data={parseCSV(testing)}
        contents={resultsContents}
        section={section}
        title={title}
      />
      <SectionHeatmapBlock
        rows={items}
        contents={heatmapContents}
        title="How likely are testing framework users to also use other technologies?"
      />
      <VerticalBlock data={parseCSV(testingOther)} contents={otherContents} title="Other Testing Tools" />
      <HorizontalBlock data={parseCSV(testingHappiness)} contents={happinessContents} title="On a scale of 1 to 5, how happy are you with your current testing solution?" />
      <AuthorBlock section={section} />
      <Pagination section={section} />
      <TwitterBlock section={section} />
    </div>
  </DocumentTitle>

export default Testing
