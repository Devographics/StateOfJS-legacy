import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../helpers/parseCSV.js'

import StackedBlock from '../components/blocks/StackedBlock.js'
import HorizontalBlock from '../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../components/blocks/SectionHeatmapBlock.js'

import flavors from '../data/flavors.csv'
import flavorsHappiness from '../data/flavorsHappiness.csv'

import Dummy from '../contents/dummy.md'

import '../stylesheets/screen.scss'

const items = ['Plain JavaScript', 'ES6', 'CoffeeScript', 'TypeScript', 'Elm', 'ClojureScript']

const Flavors = () =>
  <DocumentTitle title="Flavors">
    <div className="results-container">
      <StackedBlock data={parseCSV(flavors)} contents={Dummy} title="JavaScript Flavors" />
      <HorizontalBlock data={parseCSV(flavorsHappiness)} contents={Dummy} title="Happiness" />
      <SectionHeatmapBlock
        rows={items}
        contents={Dummy}
        title="Heatmap"
        chartTitle="How likely is a JavaScript flavor user to also want to use other technologies?"
      />
    </div>
  </DocumentTitle>

export default Flavors
