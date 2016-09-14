import React from 'react'
import DocumentTitle from 'react-document-title'
import _ from 'lodash'

import parseCSV from '../../helpers/parseCSV.js'

import StackedBlock from '../../components/blocks/StackedBlock.js'
import VerticalBlock from '../../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'

import frontend from '../../data/frontend/results.csv'
import frontendOther from '../../data/frontend/other.csv'
import frontendHappiness from '../../data/frontend/happiness.csv'

import Dummy from '../../contents/dummy.md'

import '../../stylesheets/screen.scss'

const Opinions = () =>
  <DocumentTitle title="Opinions">
    <div className="results-container">
      <StackedBlock data={parseCSV(frontend)} contents={Dummy} title="Front-end Frameworks" />
      <VerticalBlock data={parseCSV(frontendOther)} contents={Dummy} title="Other Frameworks" chartTitle="Other Front-end Frameworks" />
      <HorizontalBlock data={parseCSV(frontendHappiness)} contents={Dummy} title="Happiness" chartTitle="On a scale of 1 to 5, how happy are you with your current solution for the front-end?" />
    </div>
  </DocumentTitle>

export default Opinions
