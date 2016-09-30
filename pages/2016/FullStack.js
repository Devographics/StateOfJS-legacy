import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../../helpers/parseCSV.js'

import StackedBlock from '../../components/blocks/StackedBlock.js'
// import VerticalBlock from '../../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../../components/blocks/SectionHeatmapBlock.js'
import Pagination from '../../components/Pagination.js'
import PageTitle from '../../components/PageTitle.js'
import AuthorBlock from '../../components/blocks/AuthorBlock.js'
import TLDRBlock from '../../components/blocks/TLDRBlock.js'
import TextBlock from '../../components/blocks/TextBlock.js'
import TwitterBlock from '../../components/blocks/TwitterBlock.js'
import ResourcesBlock from '../../components/blocks/ResourcesBlock.js'

import resultsData from '../../data/fullstack/results.csv'
// import other from '../../data/fullstack/other.csv'
import happinessData from '../../data/fullstack/happiness.csv'

import tldrContents from '../../data/fullstack/tldr.md'
import introContents from '../../data/fullstack/intro.md'
import resultsContents from '../../data/fullstack/results.md'
// import other from '../../data/fullstack/other.md'
import happinessContents from '../../data/fullstack/happiness.md'
import heatmapContents from '../../data/fullstack/heatmap.md'

const section = 'fullstack'
const title = 'Full Stack'
const items = ['Meteor', 'FeathersJS', 'DoneJS', 'MERN', 'MEAN']

const FullStack = () =>
  <DocumentTitle title={title}>
    <div className="results-container">
      <PageTitle title={title} section={section} />
      <TLDRBlock contents={tldrContents} />
      <TextBlock contents={introContents} />
      <StackedBlock
        data={parseCSV(resultsData)}
        contents={resultsContents}
        section={section}
        title={title}
      />
      <SectionHeatmapBlock
        rows={items}
        contents={heatmapContents}
        title="How likely are full-stack framework users to also use other technologies?"
      />
      <ResourcesBlock section={section} />
      {/*<VerticalBlock data={parseCSV(other)} contents={Dummy} title="Other Full Stack" />*/}
      <HorizontalBlock data={parseCSV(happinessData)} contents={happinessContents} title="On a scale of 1 to 5, how happy are you with your current full-stack solution?" />
      <AuthorBlock section={section} />
      <Pagination section={section} />
      <TwitterBlock section={section} />
    </div>
  </DocumentTitle>

export default FullStack
