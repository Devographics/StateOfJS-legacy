import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../helpers/parseCSV.js'

import StackedBlock from '../components/blocks/StackedBlock.js'
import VerticalBlock from '../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../components/blocks/SectionHeatmapBlock.js'

import mobile from '../data/mobile.csv'
import mobileOther from '../data/mobileOther.csv'
import mobileHappiness from '../data/mobileHappiness.csv'

import Dummy from '../contents/dummy.md'

import '../stylesheets/screen.scss'

const items = ['Native Apps', 'React Native', 'Cordova', 'PhoneGap', 'NativeScript']

const Mobile = () =>
  <DocumentTitle title="Results">
    <div className="results-container">
      <StackedBlock data={parseCSV(mobile)} contents={Dummy} title="Mobile Frameworks" />
      <VerticalBlock data={parseCSV(mobileOther)} contents={Dummy} title="Other Mobile Frameworks" />
      <HorizontalBlock data={parseCSV(mobileHappiness)} contents={Dummy} title="Happiness" />
      <SectionHeatmapBlock
        rows={items}
        contents={Dummy}
        title="Heatmap"
        chartTitle="How likely is a mobile framework user to also want to use other technologies?"
      />
    </div>
  </DocumentTitle>

export default Mobile
