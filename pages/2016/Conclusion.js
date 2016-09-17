import React from 'react'
import DocumentTitle from 'react-document-title'

import TextBlock from '../../components/blocks/TextBlock.js'
import Pagination from '../../components/Pagination.js'
import PageTitle from '../../components/PageTitle.js'

import OpinionsIntro from '../../data/opinions/opinions-intro.md'

import '../../stylesheets/screen.scss'

const section = 'conclusion'
const title = 'Conclusion'

const Conclusion = () =>
  <DocumentTitle title={title}>
    <div className="results-container">
      <PageTitle title={title} currentSection={section} />
      <TextBlock contents={OpinionsIntro} />
      <Pagination currentSection={section} />
    </div>
  </DocumentTitle>

export default Conclusion
