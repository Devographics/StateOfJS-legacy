import React from 'react'
import DocumentTitle from 'react-document-title'

import TextBlock from '../../components/blocks/TextBlock.js'
import Pagination from '../../components/Pagination.js'
import PageTitle from '../../components/PageTitle.js'

import OpinionsIntro from '../../data/opinions/opinions-intro.md'

const section = 'introduction'
const title = 'Introduction'

const Introduction = () =>
  <DocumentTitle title={title}>
    <div className="results-container">
      <PageTitle title={title} currentSection={section} />
      <TextBlock contents={OpinionsIntro} />
      <Pagination currentSection={section} />
    </div>
  </DocumentTitle>

export default Introduction
