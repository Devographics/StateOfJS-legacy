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

import mobile from '../../data/mobile/results.csv'
import mobileOther from '../../data/mobile/other.csv'
import mobileHappiness from '../../data/mobile/happiness.csv'

import resultsContents from '../../data/mobile/results.md'
import otherContents from '../../data/mobile/other.md'
import happinessContents from '../../data/mobile/happiness.md'
import heatmapContents from '../../data/mobile/heatmap.md'

const section = 'mobile'
const title = 'Mobile Frameworks'
const items = ['Native Apps', 'React Native', 'Cordova', 'PhoneGap', 'NativeScript']

const Mobile = () =>
  <DocumentTitle title={title}>
    <div className="results-container">
      <PageTitle section={section} />
      <StackedBlock data={parseCSV(mobile)} contents={resultsContents} section={section} />
      <SectionHeatmapBlock
        rows={items}
        contents={heatmapContents}
        title="How likely is a mobile framework user to also use other technologies?"
      />
      <VerticalBlock data={parseCSV(mobileOther)} contents={otherContents} title="Other Mobile Frameworks" />
      <HorizontalBlock data={parseCSV(mobileHappiness)} contents={happinessContents} title="Happiness" />
      <AuthorBlock section={section} />
      <Pagination section={section} />
    </div>
  </DocumentTitle>

export default Mobile
