import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../../helpers/parseCSV.js'

import StackedBlock from '../../components/blocks/StackedBlock.js'
import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../../components/blocks/SectionHeatmapBlock.js'
import Pagination from '../../components/Pagination.js'
import PageTitle from '../../components/PageTitle.js'
import AuthorBlock from '../../components/blocks/AuthorBlock.js'
import TextBlock from '../../components/blocks/TextBlock.js'
import ResourcesBlock from '../../components/blocks/ResourcesBlock.js'
import TLDRBlock from '../../components/blocks/TLDRBlock.js'
import TwitterBlock from '../../components/blocks/TwitterBlock.js'

import flavors from '../../data/flavors/results.csv'
import flavorsHappiness from '../../data/flavors/happiness.csv'

import tldr from '../../data/flavors/tldr.md'
import intro from '../../data/flavors/intro.md'
import results from '../../data/flavors/results.md'
import happiness from '../../data/flavors/happiness.md'
import heatmap from '../../data/flavors/heatmap.md'

const section = 'flavors'
const title = 'JavaScript Flavors'
const items = ['Plain JavaScript', 'ES6', 'CoffeeScript', 'TypeScript', 'Elm', 'ClojureScript']

const Flavors = () =>
  <DocumentTitle title={title}>
    <div className="results-container">
      <PageTitle section={section} />
      <TLDRBlock contents={tldr} />
      <TextBlock contents={intro} />
      <StackedBlock data={parseCSV(flavors)} contents={results} title="JavaScript Flavors" section={section} />
      <SectionHeatmapBlock
        rows={items}
        contents={heatmap}
        title="How likely are JavaScript flavor users to also use other technologies?"
      />
      <ResourcesBlock section={section} sponsor="es6" />
      <HorizontalBlock data={parseCSV(flavorsHappiness)} contents={happiness} title="On a scale of 1 to 5, how happy are you with your current JavaScript flavor of choice?" />
      <Pagination section={section} />
      <TwitterBlock section={section} />
    </div>
  </DocumentTitle>

export default Flavors
