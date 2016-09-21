import React from 'react'
import DocumentTitle from 'react-document-title'
// import _ from 'lodash'

import parseCSV from '../../helpers/parseCSV.js'

import VerticalBlock from '../../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'
// import HeatmapBlock from '../../components/blocks/HeatmapBlock.js'
import AuthorBlock from '../../components/blocks/AuthorBlock.js'
import Pagination from '../../components/Pagination.js'
import PageTitle from '../../components/PageTitle.js'

// import experienceAverageData from '../../data/profiles/experience-average.csv'
// import experienceData from '../../data/profiles/experience.csv'
import experienceData from '../../data/profiles/experience.csv'
import salaryData from '../../data/profiles/salary.csv'
import textEditorsData from '../../data/profiles/text-editors.csv'

import experience from '../../contents/dummy.md'
import salary from '../../contents/dummy.md'
import textEditors from '../../contents/dummy.md'

// const items = ['Less than one year', '1-2 years', '2-5 years', '5-10 years', '10-20 years', '20+ years']

const section = 'profiles'
const title = 'Developer Profiles'

const Profiles = () =>
  <DocumentTitle title={title}>
    <div className="results-container">
      <PageTitle section={section} />
      <HorizontalBlock
        data={parseCSV(experienceData)}
        contents={experience}
        title="Years of Experience" 
      />
      <HorizontalBlock
        data={parseCSV(salaryData)}
        contents={salary}
        title="Yearly Salary" 
      />
      <VerticalBlock
        data={parseCSV(textEditorsData)}
        contents={textEditors}
        title="Favorite Text Editor" 
      />
      <AuthorBlock section={section} />
      <Pagination currentSection="profiles" />
    </div>
  </DocumentTitle>

export default Profiles
