import { get, template } from 'lodash'
import wording from 'translations/__old/en-US.yml'
import bestOfJsData from 'data/bestofjs'

export const getWording = (id, values, fallback = id) => {
    const label = get(wording, id)

    if (label === undefined) return fallback
    if (values === undefined) return label

    try {
        return template(label)(values)
    } catch (error) {
        // console.error(error)
        return label
    }
}

export const getToolName = toolId => {
    const bestOfJsProject = bestOfJsData.projects.find(p => p.slug === toolId)
    if (bestOfJsProject !== undefined) {
        return bestOfJsProject.name
    }

    return getWording(`tools.${toolId}`)
}
