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
import TwitterBlock from '../../components/blocks/TwitterBlock.js'

import stacked from '../../data/css/results.csv'
import other from '../../data/css/other.csv'
import happiness from '../../data/css/happiness.csv'

import resultsContents from '../../data/css/results.md'
import heatmapContents from '../../data/css/heatmap.md'
import otherContents from '../../data/css/other.md'
import happinessContents from '../../data/css/happiness.md'
import tldrContents from '../../data/css/tldr.md'

const section = 'css'
const title = 'CSS'
const items = ['Plain CSS', 'SASS/SCSS', 'LESS', 'CSS Modules', 'Aphrodite']

const CSS = () =>
  <DocumentTitle title={title}>
    <div className="results-container">
      <PageTitle section={section} />
      <TLDRBlock contents={tldrContents} />
      <StackedBlock
        data={parseCSV(stacked)}
        contents={resultsContents}
        section={section}
        title={title}
      />
      <SectionHeatmapBlock
        rows={items}
        contents={heatmapContents}
        title="How likely is a CSS technology user to also use other technologies?"
      />
      <VerticalBlock data={parseCSV(other)} contents={otherContents} title="Other CSS Tools" />
      <HorizontalBlock data={parseCSV(happiness)} contents={happinessContents} title="On a scale of 1 to 5, how happy are you with your current CSS solution?" />
      <AuthorBlock section={section} />
      <Pagination section={section} />
      <TwitterBlock section={section} />
    </div>
  </DocumentTitle>

export default CSS
