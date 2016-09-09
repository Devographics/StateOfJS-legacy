import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../helpers/parseCSV.js'

import StackedBlock from '../components/blocks/StackedBlock.js'
import HorizontalBlock from '../components/blocks/HorizontalBlock.js'

import flavors from '../data/flavors.csv'
import flavorsHappiness from '../data/flavorsHappiness.csv'

import Dummy from '../contents/dummy.md'

import '../stylesheets/screen.scss'

const Flavors = () =>
  <DocumentTitle title="Results">
    <div className="results-container">
      <StackedBlock data={parseCSV(flavors)} contents={Dummy} title="JavaScript Flavors" />
      <HorizontalBlock data={parseCSV(flavorsHappiness)} contents={Dummy} title="Happiness" />
    </div>
  </DocumentTitle>

export default Flavors
