import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../../helpers/parseCSV.js'

import StackedBlock from '../../components/blocks/StackedBlock.js'
import VerticalBlock from '../../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../../components/blocks/SectionHeatmapBlock.js'
import Pagination from '../../components/Pagination.js'
import PageTitle from '../../components/PageTitle.js'

import stacked from '../../data/buildtools/results.csv'
import other from '../../data/buildtools/other.csv'
import happiness from '../../data/buildtools/happiness.csv'

import Dummy from '../../contents/dummy.md'

const section = 'buildtools'
const title = 'Build Tools'
const items = ['Webpack', 'Grunt', 'Gulp', 'Browserify']

const BuildTools = () =>
  <DocumentTitle title={title}>
    <div className="results-container">
      <PageTitle title={title} currentSection={section} />
      <StackedBlock data={parseCSV(stacked)} contents={Dummy} section={section} />
      <VerticalBlock data={parseCSV(other)} contents={Dummy} title="Other Build Tools" />
      <HorizontalBlock data={parseCSV(happiness)} contents={Dummy} title="On a scale of 1 to 5, how happy are you with your current build tools?" />
      <SectionHeatmapBlock
        rows={items}
        contents={Dummy}
        title="How likely are build tool users to also use other technologies?"
      />
      <Pagination currentSection={section} />
    </div>
  </DocumentTitle>

export default BuildTools
