import React from 'react'
import { StickyContainer, Sticky } from 'react-sticky'
import { throttle, sortBy, fromPairs, values, last } from 'lodash'
import { SECTIONS, FILTERS, RESPONSES } from '../../helpers/constants.js'
import StackedBar from '../stackedbar/StackedBar.js'

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

class StackedBlock extends React.Component {
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
      <div className="section">
        <StickyContainer className="sticky-container">
          <Sticky className="sticky">
            <StackedBar identifier="Option" title="Testing Tools" data={this.props.data} responses={RESPONSES} filters={FILTERS} filter={this.state[SECTIONS.TESTING]} handleSelect={(filter) => this.filterUpdate(SECTIONS.TESTING, filter)}  />
          </Sticky>
        </StickyContainer>

        <div className="section-contents">
          <h1>{this.props.title}</h1>
          <this.props.contents />
          {/*
          {this.filterPoint(SECTIONS.TESTING, FILTERS.ALL)}
          <TestingIntro />
          {this.filterPoint(SECTIONS.TESTING, FILTERS.INTEREST)}
          <TestingInterest />
          {this.filterPoint(SECTIONS.TESTING, FILTERS.SATISFACTION)}
          <TestingSatisfaction />
          */}
        </div>
      </div>
    )
  }
}

StackedBlock.propTypes = {
  title: React.PropTypes.string,
  contents: React.PropTypes.func,
  data: React.PropTypes.array,
}

export default StackedBlock
