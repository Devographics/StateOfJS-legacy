import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../../helpers/parseCSV.js'

import StackedBlock from '../../components/blocks/StackedBlock.js'
import VerticalBlock from '../../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../../components/blocks/SectionHeatmapBlock.js'
import ResourcesBlock from '../../components/blocks/ResourcesBlock.js'
import AuthorBlock from '../../components/blocks/AuthorBlock.js'
import TextBlock from '../../components/blocks/TextBlock.js'
import Pagination from '../../components/Pagination.js'
import PageTitle from '../../components/PageTitle.js'
import TLDRBlock from '../../components/blocks/TLDRBlock.js'
import TwitterBlock from '../../components/blocks/TwitterBlock.js'

import stacked from '../../data/statemanagement/results.csv'
import other from '../../data/statemanagement/other.csv'
import happiness from '../../data/statemanagement/happiness.csv'

import resultsContents from '../../data/statemanagement/results.md'
import heatmapContents from '../../data/statemanagement/heatmap.md'
import otherContents from '../../data/statemanagement/other.md'
import happinessContents from '../../data/statemanagement/happiness.md'
import conclusionContents from '../../data/statemanagement/conclusion.md'
import tldr from '../../data/statemanagement/tldr.md'

const section = 'statemanagement'
const title = 'State Management'
const items = ['Redux', 'MobX', 'Relay']

const StateManagement = () =>
  <DocumentTitle title={title}>
    <div className="results-container">
      <PageTitle section={section} />
      <TLDRBlock contents={tldr} />
      <StackedBlock
        data={parseCSV(stacked)}
        contents={resultsContents}
        section={section}
        title={title}
      />
      <SectionHeatmapBlock
        rows={items}
        contents={heatmapContents}
        title="How likely are state management library users to also use other technologies?"
      />
      <ResourcesBlock section={section} sponsor={<a href="https://egghead.io"><img src="https://d1xwtr0qwr70yv.cloudfront.net/assets/elements/logo-mobile-0012236aa1a9766db6b0cc9705df19ec.svg" />egghead.io</a>} />
      <VerticalBlock data={parseCSV(other)} contents={otherContents} title="Other State Management Frameworks (Mentions)" />
      <HorizontalBlock data={parseCSV(happiness)} contents={happinessContents} title="On a scale of 1 to 5, how happy are you with your current solution for state management?" />
      <TextBlock contents={conclusionContents} />
      <AuthorBlock section={section} />
      <Pagination section="statemanagement" />
      <TwitterBlock section={section} />
    </div>
  </DocumentTitle>

export default StateManagement
