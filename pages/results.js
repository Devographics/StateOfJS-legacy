import React from 'react'
import DocumentTitle from 'react-document-title'
import { StickyContainer, Sticky } from 'react-sticky'
import WayPoint from 'react-waypoint'
import { throttle } from 'lodash'

import flavors from '../data/flavors.json'
import frontend from '../data/frontend.json'
import StackedBar from './charts/_stackedbar.js'
import './_results.scss'

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
    filters: [FILTERS.ALL, FILTERS.INTEREST]
  },
  notInterested: {
    string: "I've heard of it, and am not interested",
    onColor: '#b3d8da',
    offColor: '#dadada',
    filters: [FILTERS.ALL, FILTERS.INTEREST]
  },
  wantToLearn: {
    string: "I've heard of it, and would like to learn it",
    onColor: '#4cbcc1',
    offColor: '#cecece',
    filters: [FILTERS.ALL, FILTERS.INTEREST]
  },
  notAgain: {
    string: "I've used it before, and would not use it again",
    onColor: '#e0a4bc',
    offColor: '#dadada',
    filters: [FILTERS.ALL, FILTERS.SATISFACTION]
  },
  useAgain: {
    string: "I've used it before, and would use it again",
    onColor: '#e91467',
    offColor: '#cecece',
    filters: [FILTERS.ALL, FILTERS.SATISFACTION]
  }
}

class Results extends React.Component {
  constructor(props) {
    super(props)
    this.filterUpdate = this.filterUpdate.bind(this)
    this.filterPoint = this.filterPoint.bind(this)
    this._filterNameToBreakpoints = []
    this.state = {
      filterFlavors: FILTERS.ALL,
      filterFrameworks: FILTERS.ALL,
    }
  }

  filterUpdate(filterName, value) {
    console.log('updating', filterName, value);
    this.setState({ [filterName]: value })
  }

  filterPoint(filterName, enterValue, leaveValue, text) {
    return (
      <WayPoint
        throttleHandler={(scrollHandler) => throttle(scrollHandler, 50)}
        onEnter={() => {
          if(enterValue) {
            console.log('enter', enterValue)
            this.filterUpdate(filterName, enterValue)
          }
        }}
        onLeave={() => {
          if(leaveValue) {
            console.log('leave', leaveValue)
            this.filterUpdate(filterName, leaveValue)
          }
        }}
      >
        {text}
      </WayPoint>
    )
  }

  render() {
    return (
      <DocumentTitle title="Results">
        <div className="results-container">
          <div className="section">
            <StickyContainer className="sticky-container">
              <Sticky className="sticky">
                <StackedBar identifier="Flavor" title="JavaScript Flavors" data={flavors} sections={SECTIONS} filters={FILTERS} filter={this.state.filterFlavors} handleSelect={(filter) => this.filterUpdate('filterFlavors', filter)} />
              </Sticky>
            </StickyContainer>

            <div className="section-contents">
              <h1>JavaScript Flavors</h1>
              <p>{this.filterPoint('filterFlavors', FILTERS.ALL, FILTERS.INTEREST)} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <p>{this.filterPoint('filterFlavors', FILTERS.INTEREST, FILTERS.SATISFACTION)} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <p>{this.filterPoint('filterFlavors', FILTERS.SATISFACTION, FILTERS.SATISFACTION)} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
          </div>
          <div className="section">
            <StickyContainer className="sticky-container">
              <Sticky className="sticky">
                <StackedBar identifier="Framework" title="Front-end Frameworks" data={frontend} sections={SECTIONS} filters={FILTERS} filter={this.state.filterFrameworks} handleSelect={(filter) => this.filterUpdate('filterFrameworks', filter)}  />
              </Sticky>
            </StickyContainer>

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
}

export default Results
