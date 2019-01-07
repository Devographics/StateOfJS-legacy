import React from 'react'
import PropTypes from 'prop-types'
import { flatten, times } from 'lodash'
import { StaticQuery, graphql } from 'gatsby'

import periodicTableData from '../../data/periodic-table.yaml'
import PeriodicTable from './PeriodicTable'

const repeatArray = (array, number) => times(number).reduce(acc => acc.concat(array), [])

const PeriodicTableContainer = ({ data }) => {
    const allProjects = data.allProject.edges.map(edge => edge.node)
    const findProject = id => allProjects.find(project => project.id === id)
    const categories = Object.values(periodicTableData)
    const addBestOfJavaScriptData = project => {
        const foundProject = findProject(project.id)
        return { ...foundProject, ...project } // the order matters, `project` values (from yaml) override `foundProject` values
    }
    const sortByStars = (a, b) => {
        return a.stars > b.stars ? -1 : 1
    }
    const elements = flatten(
        categories.map(({ color, projects }) =>
            projects
                .map(project => ({ ...addBestOfJavaScriptData(project), color }))
                .sort(sortByStars)
        )
    )
    // Let's duplicate N times data to fill the screen
    const repeatedElements = repeatArray(elements, 3)
    return <PeriodicTable elements={repeatedElements} />
}

PeriodicTableContainer.propTypes = {
    data: PropTypes.object.isRequired // provided by GraphQL data store (see `layouts/index.js`)
}

const PeriodicTableWithData = (props) => (
    <StaticQuery
        query={graphql`
            query AllProjects {
                allProject {
                    edges {
                        node {
                            id
                            stars
                            name
                        }
                    }
                }
            }
        `}
        render={data => <PeriodicTableContainer {...props} data={data} />}
    />
)

export default PeriodicTableWithData
