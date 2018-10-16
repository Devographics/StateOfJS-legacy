import { get } from 'lodash'
import wording from '../data/wording.yml'
import bestOfJsData from '../data/bestofjs'

export const getLabel = id => {
    const label = get(wording, id)

    return label !== undefined ? label : `![${id}]`
}

export const getToolName = toolId => {
    const bestOfJsProject = bestOfJsData.projects.find(p => p.slug === toolId)
    if (bestOfJsProject !== undefined) {
        return bestOfJsProject.name
    }

    return getLabel(`tools.${toolId}`)
}
