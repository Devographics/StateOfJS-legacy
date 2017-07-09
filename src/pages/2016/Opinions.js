import React from 'react'
import DocumentTitle from 'react-document-title'
import _ from 'lodash'

import parseCSV from '../../helpers/parseCSV.js'

import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'
import TextBlock from '../../components/blocks/TextBlock.js'
import Pagination from '../../components/Pagination.js'
import PageTitle from '../../components/PageTitle.js'
import AuthorBlock from '../../components/blocks/AuthorBlock.js'
import TwitterBlock from '../../components/blocks/TwitterBlock.js'

import opinions from '../../../data/opinions/opinions.csv'

import OpinionsIntro from '../../../data/opinions/opinions-intro.md'

import enjoyjavascript from '../../../data/opinions/enjoy-javascript.md'
import mainlanguage from '../../../data/opinions/main-language.md'
import overused from '../../../data/opinions/over-used.md'
import overlycomplex from '../../../data/opinions/overly-complex.md'
import rightdirection from '../../../data/opinions/right-direction.md'
import toofast from '../../../data/opinions/too-fast.md'
import toolong from '../../../data/opinions/too-long.md'

const section = 'opinions'
const title = 'Opinions'

const imports = {
  'I enjoy building JavaScript apps': enjoyjavascript,
  'I would like JavaScript to be my main programming language': mainlanguage,
  'JavaScript is over-used online': overused,
  'Building JavaScript apps is overly complex right now': overlycomplex,
  'JavaScript is moving in the right direction': rightdirection,
  'The JavaScript ecosystem is changing too fast': toofast,
  'This survey is too damn long!': toolong,
}

const Opinions = () =>
  <DocumentTitle title={title}>
    <div className="results-container">
      <PageTitle section={section} />
      <TextBlock contents={OpinionsIntro} />
      {opinions.map((opinion, i) => {
        const opinionData = _.clone(opinion)
        delete opinionData.Option

        const opinionTitle = opinion.Option
        const markdown = imports[opinionTitle]
        const dataArray = parseCSV(_.keys(opinionData).map(key => ({ Option: key, Value: opinion[key] })))

        return (
          <HorizontalBlock
            key={i}
            data={dataArray}
            contents={markdown}
            title={opinionTitle}
          />
        )
      })}
      <Pagination section={section} />
      <TwitterBlock section={section} />
    </div>
  </DocumentTitle>

export default Opinions
