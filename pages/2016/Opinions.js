import React from 'react'
import DocumentTitle from 'react-document-title'
import _ from 'lodash'

import parseCSV from '../../helpers/parseCSV.js'

import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'
import TextBlock from '../../components/blocks/TextBlock.js'

import opinions from '../../data/opinions/opinions.csv'

import OpinionsIntro from '../../data/opinions/opinions-intro.md'

import '../../stylesheets/screen.scss'

import enjoyjavascript from '../../data/opinions/enjoy-javascript.md'
import mainlanguage from '../../data/opinions/main-language.md'
import overused from '../../data/opinions/over-used.md'
import overlycomplex from '../../data/opinions/overly-complex.md'
import rightdirection from '../../data/opinions/right-direction.md'
import toofast from '../../data/opinions/too-fast.md'
import toolong from '../../data/opinions/too-long.md'

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
  <DocumentTitle title="Opinions">
    <div className="results-container">
      <TextBlock contents={OpinionsIntro} />
      {opinions.map(opinion => {
        const opinionTitle = opinion.Option
        const markdown = imports[opinionTitle]
        delete opinion.Option
        const dataArray = parseCSV(_.keys(opinion).map(key => ({ Option: key, Value: opinion[key] })))

        return (
          <HorizontalBlock
            key={opinionTitle}
            data={dataArray}
            contents={markdown}
            chartTitle={opinionTitle} 
          />
        )
      })}
    </div>
  </DocumentTitle>

export default Opinions
