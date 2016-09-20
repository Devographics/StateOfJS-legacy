import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../../helpers/parseCSV.js'

import StackedBlock from '../../components/blocks/StackedBlock.js'
import VerticalBlock from '../../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../../components/blocks/SectionHeatmapBlock.js'
import Pagination from '../../components/Pagination.js'
import PageTitle from '../../components/PageTitle.js'

import mobile from '../../data/mobile/results.csv'
import mobileOther from '../../data/mobile/other.csv'
import mobileHappiness from '../../data/mobile/happiness.csv'

import Dummy from '../../contents/dummy.md'

const section = 'mobile'
const title = 'Mobile Frameworks'
const items = ['Native Apps', 'React Native', 'Cordova', 'PhoneGap', 'NativeScript']

const Mobile = () =>
  <DocumentTitle title={title}>
    <div className="results-container">
      <PageTitle title={title} currentSection={section} />
      <StackedBlock data={parseCSV(mobile)} contents={Dummy} title="Mobile Frameworks" section={section} />
      <VerticalBlock data={parseCSV(mobileOther)} contents={Dummy} title="Other Mobile Frameworks" />
      <HorizontalBlock data={parseCSV(mobileHappiness)} contents={Dummy} title="Happiness" />
      <SectionHeatmapBlock
        rows={items}
        contents={Dummy}
        title="Heatmap"
        chartTitle="How likely is a mobile framework user to also use other technologies?"
      />
      <Pagination currentSection={section} />
    </div>
  </DocumentTitle>

export default Mobile
