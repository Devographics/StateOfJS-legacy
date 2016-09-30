import React from 'react'
import DocumentTitle from 'react-document-title'
import _ from 'lodash'

import parseCSV from '../../helpers/parseCSV.js'

import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'
import VerticalBlock from '../../components/blocks/VerticalBlock.js'
import TextBlock from '../../components/blocks/TextBlock.js'
import Pagination from '../../components/Pagination.js'
import PageTitle from '../../components/PageTitle.js'
import AuthorBlock from '../../components/blocks/AuthorBlock.js'
import TwitterBlock from '../../components/blocks/TwitterBlock.js'

import features from '../../data/features/features.csv'
import featuresScores from '../../data/features/featuresScores.csv'

import FeaturesIntro from '../../data/features/features-intro.md'
import HighestRated from '../../data/features/highest-rated.md'
import OtherFeatures from '../../data/features/other-features.md'

import codesplitting from '../../data/features/code-splitting.md'
import deadcodeelimination from '../../data/features/dead-code-elimination.md'
import hotmodulereloading from '../../data/features/hot-module-reloading.md'
import optimisticupdates from '../../data/features/optimistic-updates.md'
import progressiveenhancement from '../../data/features/progressive-enhancement.md'
import realtimeoperations from '../../data/features/real-time-operations.md'
import serversiderendering from '../../data/features/server-side-rendering.md'
import timetraveldebugging from '../../data/features/time-travel-debugging.md'

const imports = {
  codesplitting,
  deadcodeelimination,
  hotmodulereloading,
  optimisticupdates,
  progressiveenhancement,
  realtimeoperations,
  serversiderendering,
  timetraveldebugging,
}

const section = 'features'
const title = 'Features'

const Features = () =>
  <DocumentTitle title="Features">
    <div className="results-container">
      <PageTitle section={section} />
      <TextBlock contents={FeaturesIntro} />
      {features.map(feature => {
        const featureTitle = feature.Option
        const featureFileName = featureTitle.replace(new RegExp(' ', 'g'), '').replace(new RegExp('-', 'g'), '').toLowerCase()
        const markdown = imports[featureFileName]

        // const featurePath = `../../data/features/${featureFileName}.md`
        delete feature.Option
        const dataArray = parseCSV(_.keys(feature).map(key => ({ Option: key, Value: feature[key] })))
        // const contents = require(featurePath)

        return (
          <HorizontalBlock
            key={featureTitle}
            data={dataArray}
            contents={markdown}
            title={featureTitle}
          />
        )
      })}
      <VerticalBlock data={parseCSV(featuresScores)} contents={HighestRated} title="Highest-Rated Features" />
      <TextBlock contents={OtherFeatures} title="Other Features" />
      <Pagination section="features" />
      <TwitterBlock section={section} />
    </div>
  </DocumentTitle>

export default Features
