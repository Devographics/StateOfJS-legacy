import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../../helpers/parseCSV.js'

import StackedBlock from '../../components/blocks/StackedBlock.js'
import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../../components/blocks/SectionHeatmapBlock.js'
import Pagination from '../../components/Pagination.js'
import PageTitle from '../../components/PageTitle.js'
import AuthorBlock from '../../components/blocks/AuthorBlock.js'

import flavors from '../../data/flavors/results.csv'
import flavorsHappiness from '../../data/flavors/happiness.csv'

import Dummy from '../../contents/dummy.md'

const section = 'flavors'
const title = 'JavaScript Flavors'
const items = ['Plain JavaScript', 'ES6', 'CoffeeScript', 'TypeScript', 'Elm', 'ClojureScript']

const Flavors = () =>
  <DocumentTitle title={title}>
    <div className="results-container">
      <PageTitle section={section} />
      <StackedBlock data={parseCSV(flavors)} contents={Dummy} title="JavaScript Flavors" section={section} />
      <SectionHeatmapBlock
        rows={items}
        contents={Dummy}
        title="Heatmap"
        chartTitle="How likely are JavaScript flavor users to also use other technologies?"
      />
      <HorizontalBlock data={parseCSV(flavorsHappiness)} contents={Dummy} title="On a scale of 1 to 5, how happy are you with your current JavaScript flavor of choice?" />
      <AuthorBlock section={section} />
      <Pagination section={section} />
    </div>
  </DocumentTitle>

export default Flavors
