import React from 'react'
import DocumentTitle from 'react-document-title'
import { StickyContainer, Sticky } from 'react-sticky'
import { throttle, sortBy, fromPairs, values, last, take, max } from 'lodash'

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'

import flavors from '../data/flavors.csv'
import frontend from '../data/frontend.csv'
import testing from '../data/testing.csv'
import testingOther from '../data/testingOther.csv'
import heatmap from '../data/heatmap2.js'

import testingIntro from './results/testing/_intro.md'
import testingInterest from './results/testing/_interest.md'
import testingSatisfaction from './results/testing/_satisfaction.md'

import { SECTIONS, FILTERS, RESPONSES } from './_constants'
import StackedBar from '../components/stackedbar/StackedBar.js'
import Heatmap from './charts/_heatmap2'
import '../stylesheets/screen.scss'

class FilterPoint extends React.Component {
  componentDidMount() {
    this.props.breakpoints.push({
      filter: this.props.filter,
      top: this._ref.getBoundingClientRect().top
    })
  }
  render() {
    return <span ref={(e) => this._ref = e} style={{fontSize: 0}} />
  }
}

FilterPoint.getWindow = () => {
  if (typeof window !== 'undefined') {
    return window
  }
}

class Results extends React.Component {
  constructor(props) {
    super(props)
    this.filterUpdate = this.filterUpdate.bind(this)
    this._handleScroll = throttle(this._handleScroll.bind(this), 100)
    // { Flavors: [], ... }
    this._sectionToBreakpoints = fromPairs(values(SECTIONS).map((section) => [section, []]))
    this.state = fromPairs(values(SECTIONS).map((section) => [section, FILTERS.ALL]))
  }

  componentDidMount() {
    if (!FilterPoint.getWindow()) return
    window.addEventListener('resize', this._handleScroll)
    window.addEventListener('scroll', this._handleScroll)

    Object.keys(this._sectionToBreakpoints).forEach((section) => {
      this._sectionToBreakpoints[section] = sortBy(this._sectionToBreakpoints[section], (b) => -b.top)
    })
  }

  componentWillUnmount() {
    if (!FilterPoint.getWindow()) return
    window.removeEventListener('resize', this._handleScroll)
    window.removeEventListener('scroll', this._handleScroll)
  }

  filterUpdate(section, value) {
    this.setState({ [section]: value })
  }

  _activeFilter(breakpoints, top) {
    if(!breakpoints.length) return null
    const active = breakpoints.find((b) => b.top < top)
    return (active && active.filter) || last(breakpoints).filter
  }

  _handleScroll() {
    const doc = document
    const body = doc.body
    const scrollTop = (doc.documentElement && doc.documentElement.scrollTop) || body.scrollTop
    const scrollHeight = window.innerHeight // (doc.documentElement && doc.documentElement.scrollHeight) || body.scrollHeight

    const updatedState = _.clone(this.state) // clone the entire state to be able to compare changes
    const top = scrollTop + scrollHeight / 2
    Object.keys(this._sectionToBreakpoints).forEach((section) => {
      const filter = this._activeFilter(this._sectionToBreakpoints[section], top)
      if(filter) updatedState[section] = filter
    })

    if (!_.isEqual(updatedState, this.state)) {
      this.setState(updatedState)
    }
  }

  filterPoint(section, filter) {
    return (
      <FilterPoint breakpoints={this._sectionToBreakpoints[section]} filter={filter} />
    )
  }

  render() {
    return (
      <DocumentTitle title="Results">
        <div className="results-container">
          {/*
          <div className="section">
            <Heatmap width={600} height={600} data={heatmap} />
          </div>
          */}

          <div className="section">
            <StickyContainer className="sticky-container">
              <Sticky className="sticky">
                <StackedBar identifier="Option" title="JavaScript Flavors" data={flavors} responses={RESPONSES} filters={FILTERS} filter={this.state[SECTIONS.FLAVORS]} handleSelect={(filter) => this.filterUpdate(SECTIONS.FLAVORS, filter)} />
              </Sticky>
            </StickyContainer>

            <div className="section-contents">
              <h1>JavaScript Flavors</h1>
              <p>{this.filterPoint(SECTIONS.FLAVORS, FILTERS.ALL)} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <p>{this.filterPoint(SECTIONS.FLAVORS, FILTERS.INTEREST)} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <p>{this.filterPoint(SECTIONS.FLAVORS, FILTERS.SATISFACTION)} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
          </div>
          <div className="section">
            <StickyContainer className="sticky-container">
              <Sticky className="sticky">
                <StackedBar identifier="Option" title="Front-end Frameworks" data={frontend} responses={RESPONSES} filters={FILTERS} filter={this.state[SECTIONS.FRAMEWORKS]} handleSelect={(filter) => this.filterUpdate(SECTIONS.FRAMEWORKS, filter)}  />
              </Sticky>
            </StickyContainer>

            <div className="section-contents">
              <h1>Front-End Frameworks</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
          </div>
          <div className="section">
            <StickyContainer className="sticky-container">
              <Sticky className="sticky">
                <StackedBar identifier="Option" title="Testing Tools" data={testing} responses={RESPONSES} filters={FILTERS} filter={this.state[SECTIONS.TESTING]} handleSelect={(filter) => this.filterUpdate(SECTIONS.TESTING, filter)}  />
              </Sticky>
            </StickyContainer>

            <div className="section-contents">
              <h1>Testing Tools</h1>
              {this.filterPoint(SECTIONS.TESTING, FILTERS.ALL)}
              <div dangerouslySetInnerHTML={{ __html: testingIntro.body }} />
              {this.filterPoint(SECTIONS.TESTING, FILTERS.INTEREST)}
              <div dangerouslySetInnerHTML={{ __html: testingInterest.body }} />
              {this.filterPoint(SECTIONS.TESTING, FILTERS.SATISFACTION)}
              <div dangerouslySetInnerHTML={{ __html: testingSatisfaction.body }} />
            </div>
          </div>

          <div className="section">
            <ResponsiveContainer minHeight={400} width="100%" >
              <BarChart data={take(testingOther, 10)} layout="vertical" barCategoryGap="30%" margin={ {top: 0, right: 0, left: 0, bottom: 0} } >
                <YAxis dataKey="Option" type="category" tickLine={false} axisLine={{ stroke: '#666' }} />
                <XAxis type="number" tickLine={true} axisLine={{ stroke: '#666' }} domain={[0, max(testingOther.map(d => parseInt(d.Mentions)))]} />
                <Tooltip/>
                <Bar isAnimationActive={false} dataKey="Mentions" fill="#666" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

export default Results
