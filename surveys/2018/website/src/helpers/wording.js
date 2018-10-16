import { get, template } from 'lodash'
import wording from '../data/wording.yml'
import bestOfJsData from '../data/bestofjs'

export const getWording = (id, values) => {
    const label = get(wording, id)

    if (label === undefined) return `![${id}]`
    if (values === undefined) return label
    return template(label)(values)
}

export const getToolName = toolId => {
    const bestOfJsProject = bestOfJsData.projects.find(p => p.slug === toolId)
    if (bestOfJsProject !== undefined) {
        return bestOfJsProject.name
    }

    return getWording(`tools.${toolId}`)
}
