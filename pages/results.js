import React from 'react'
import DocumentTitle from 'react-document-title'
import flavors from '../data/flavors.json'
import frontend from '../data/frontend.json'
import StackedBar from './charts/_stackedbar.js'
import './_results.scss'
import { StickyContainer, Sticky } from 'react-sticky';

const FILTERS = {
  ALL: 'All',
  INTEREST: 'Interest',
  SATISFACTION: 'Satisfaction',
}

const SECTIONS = {
  neverHeard: {
    string: "I've never heard of it",
    onColor: '#e8e8e8',
    offColor: '#e8e8e8',
    filters: ['All']
  },
  notInterested: {
    string: "I've heard of it, and am not interested",
    onColor: '#b3d8da',
    offColor: '#dadada',
    filters: ['All', 'Interest']
  },
  wantToLearn: {
    string: "I've heard of it, and would like to learn it",
    onColor: '#4cbcc1',
    offColor: '#cecece',
    filters: ['All', 'Interest']
  },
  notAgain: {
    string: "I've used it before, and would not use it again",
    onColor: '#e0a4bc',
    offColor: '#dadada',
    filters: ['All', 'Satisfaction']
  },
  useAgain: {
    string: "I've used it before, and would use it again",
    onColor: '#e91467',
    offColor: '#cecece',
    filters: ['All', 'Satisfaction']
  }
}

const Results = () => {
  return (
    <DocumentTitle title="Results">
      <div className="results-container">
        <div className="section">
          <StickyContainer className="section-sticky-container">
            <Sticky className="chart-sticky">
              <StackedBar identifier="Flavor" title="JavaScript Flavors" data={flavors} sections={SECTIONS} filters={FILTERS}/>
            </Sticky>
            <div className="section-contents">
              <h1>JavaScript Flavors</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
          </StickyContainer>
        </div>
        <div className="section">
          <StackedBar identifier="Framework" title="Front-end Frameworks" data={frontend} sections={SECTIONS} filters={FILTERS}/>
          <div className="section-contents">
            <h1>Front-End Frameworks</h1>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>
        </div>
      </div>
    </DocumentTitle>
  )
}

export default Results