import React from 'react'
import DocumentTitle from 'react-document-title'
import { StickyContainer, Sticky } from 'react-sticky'
import { throttle, sortBy, fromPairs, values, last, take } from 'lodash'

import mobile from '../data/mobile.csv'
import mobileOther from '../data/mobileOther.csv'

import heatmapData from '../data/heatmap2.js'

import Dummy from '../contents/dummy.md'

import { SECTIONS, FILTERS, RESPONSES } from './_constants'

import StackedBar from '../components/stackedbar/StackedBar.js'
import HorizontalBar from '../components/horizontalbar/HorizontalBar.js'
import Heatmap from '../components/heatmap/Heatmap.js'

import '../stylesheets/screen.scss'

class Mobile extends React.Component {
  
  constructor(props) {
    super(props)
    this.filterUpdate = this.filterUpdate.bind(this)
    this.state = fromPairs(values(SECTIONS).map((section) => [section, FILTERS.ALL]))
  }

  filterUpdate(section, value) {
    this.setState({ [section]: value })
  }

  render() {
    return (
      <DocumentTitle title="Results">
        <div className="results-container">

          <div className="section">
            <StickyContainer className="sticky-container">
              <Sticky className="sticky">
                <StackedBar identifier="Option" title="Mobile Frameworks" data={mobile} responses={RESPONSES} filters={FILTERS} filter={this.state[SECTIONS.MOBILE]} handleSelect={(filter) => this.filterUpdate(SECTIONS.MOBILE, filter)}  />
              </Sticky>
            </StickyContainer>

            <div className="section-contents">
              <h1>Mobile Frameworks</h1>
              <Dummy />
              <Dummy />
            </div>
          </div>

          <div className="section">
            <StickyContainer className="sticky-container">
              <Sticky className="sticky">
                <HorizontalBar title="Other Testing Tools (Total Mentions)" data={mobileOther} />
              </Sticky>
            </StickyContainer>

            <div className="section-contents">
              <h1>Other Mobile Frameworks</h1>
              <Dummy />
              <Dummy />
            </div>
          </div>

          <div className="section">
            <StickyContainer className="sticky-container">
              <Sticky className="sticky">
                <Heatmap title="Heatmap" data={heatmapData} width={600} height={600} />
              </Sticky>
            </StickyContainer>

            <div className="section-contents">
              <h1>Heatmap</h1>
              <Dummy />
              <Dummy />
            </div>
          </div>

        </div>
      </DocumentTitle>
    )
  }
}

export default Mobile
