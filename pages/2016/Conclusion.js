import React from 'react'
import DocumentTitle from 'react-document-title'

import TextBlock from '../../components/blocks/TextBlock.js'
import Pagination from '../../components/Pagination.js'
import PageTitle from '../../components/PageTitle.js'
import AuthorBlock from '../../components/blocks/AuthorBlock.js'

import conclusionContents from '../../data/conclusion/conclusion.md'

const section = 'conclusion'
const title = 'Conclusion'

const Conclusion = () =>
  <DocumentTitle title={title}>
    <div className="results-container">
      <PageTitle section={section} />
      <TextBlock contents={conclusionContents} />
      <Pagination currentSection={section} />
    </div>
  </DocumentTitle>

export default Conclusion
