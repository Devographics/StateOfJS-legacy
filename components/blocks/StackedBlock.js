import React from 'react'
import { StickyContainer, Sticky } from 'react-sticky'
import _, { throttle } from 'lodash'
import { FILTERS, RESPONSES } from '../../helpers/constants.js'
import StackedBar from '../stackedbar/StackedBar.js'

const getWindow = () => {
  if (typeof window !== 'undefined') {
    return window
  }
}

class StackedBlock extends React.Component {
  constructor (props) {
    super(props)
    this.setPointPosition = this.setPointPosition.bind(this)
    this.handleScroll = throttle(this.handleScroll.bind(this), 50)
    this.handleSelect = this.handleSelect.bind(this)
    this.filterPoints = []
    this.state = {
      filter: 'All',
      filterPoints: [],
    }
  }

  getChildContext () {
    return { setPointPosition: this.setPointPosition };
  }

  componentDidMount () {
    if (!getWindow()) return
    window.addEventListener('resize', this.handleScroll)
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    if (!getWindow()) return
    window.removeEventListener('resize', this.handleScroll)
    window.removeEventListener('scroll', this.handleScroll)
  }

  setPointPosition (filter, top) {
    this.filterPoints.push({ filter, top })
  }

  handleSelect (value) {
    this.setState({
      filter: value
    })
  }

  handleScroll () {
    const doc = document
    const body = doc.body
    const scrollTop = (doc.documentElement && doc.documentElement.scrollTop) || body.scrollTop
    const scrollHeight = window.innerHeight // (doc.documentElement && doc.documentElement.scrollHeight) || body.scrollHeight

    const updatedState = _.clone(this.state) // clone the entire state to be able to compare changes
    const triggerTop = scrollTop + scrollHeight / 3 // set the trigger point at one-third of the viewport height

    this.filterPoints.forEach(filterPoint => {
      if (triggerTop > filterPoint.top ) {
        updatedState.filter = filterPoint.filter
      }
    })

    if (!_.isEqual(updatedState, this.state)) {
      this.setState(updatedState)
    }
  }

  render () {
    return (
      <div className="section">
        <StickyContainer className="sticky-container">
          <Sticky className="sticky">
            <StackedBar identifier="Option" title={this.props.title} data={this.props.data} responses={RESPONSES} filters={FILTERS} filter={this.state.filter} handleSelect={this.handleSelect} />
          </Sticky>
        </StickyContainer>
        <div className="section-contents">
          <this.props.contents />
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

StackedBlock.childContextTypes = {
  setPointPosition: React.PropTypes.func,
}

export default StackedBlock
