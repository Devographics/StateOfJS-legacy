import React from 'react'
import DocumentTitle from 'react-document-title'

import TextBlock from '../../components/blocks/TextBlock.js'
import Pagination from '../../components/Pagination.js'
import PageTitle from '../../components/PageTitle.js'
import AuthorBlock from '../../components/blocks/AuthorBlock.js'

import OpinionsIntro from '../../data/opinions/opinions-intro.md'

const section = 'introduction'
const title = 'Introduction'

const Introduction = () =>
  <DocumentTitle title={title}>
    <div className="results-container">
      <PageTitle section={section} />
      <TextBlock contents={OpinionsIntro} />
      <AuthorBlock section={section} />
      <Pagination section={section} />
    </div>
  </DocumentTitle>

export default Introduction
