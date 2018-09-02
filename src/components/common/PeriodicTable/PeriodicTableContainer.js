import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { flatten, times } from 'lodash'

import settings from '../../../data/periodic-table.yaml'
import PeriodicTable from './PeriodicTable'

const repeatArray = (array, number) => times(number).reduce(acc => acc.concat(array), [])

class PeriodicTableContainer extends Component {
  render () {
    const { data } = this.props
    const allProjects = data.allProject.edges.map(edge => edge.node)
    const findProject = id => allProjects.find(project => project.id === id)
    console.info(settings)
    const categories = Object.values(settings)
    const addData = project => {
      const foundProject = findProject(project.id)
      return Object.assign({}, foundProject, project) // the order matters, `project` values (from yaml) override `foundProject` values
    }

    const elements = flatten(
      categories.map(({ color, projects }) =>
        projects.map(project => Object.assign({}, addData(project), { color }))
      )
    )
    const repeatedElements = repeatArray(elements, 4)
    return <PeriodicTable elements={repeatedElements} />
  }
}

PeriodicTableContainer.propTypes = {
  data: PropTypes.object.isRequired, // provided by graphQL
}

export default PeriodicTableContainer
