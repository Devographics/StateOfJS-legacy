import React from 'react'
import DocumentTitle from 'react-document-title'
import _ from 'lodash'

import parseCSV from '../helpers/parseCSV.js'

import VerticalBlock from '../components/blocks/VerticalBlock.js'
import HeatmapBlock from '../components/blocks/HeatmapBlock.js'

import experienceAverageData from '../data/experience-average.csv'
import experienceData from '../data/experience.csv'

import heatmap from '../contents/dummy.md'

import '../stylesheets/screen.scss'

const items = ['Less than one year', '1-2 years', '2-5 years', '5-10 years', '10-20 years', '20+ years']

const Profile = () =>
  <DocumentTitle title="Results">
    <div className="results-container">
      <VerticalBlock 
        data={parseCSV(experienceAverageData)} 
        contents={heatmap} 
        title="Other Frameworks" 
        chartTitle="Average years of developer experience"
        highlight="Average"
      />

      <HeatmapBlock 
        rows={items} 
        data={experienceData} 
        contents={heatmap} 
        title="Heatmap" 
        chartTitle="Experience in percent" 
        min={0}
        max={1.4}
      />
    </div>
  </DocumentTitle>

export default Profile
