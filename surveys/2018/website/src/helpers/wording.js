import { get, template } from 'lodash'
import wording from '../i18n/en-US/translations.yml'

export const getWording = (id, values, fallback = id) => {
    const label = get(wording, id)

    if (label === undefined) return fallback
    if (values === undefined) return label
    return template(label)(values)
}

export const getToolName = (toolId, projects = []) => {
    const bestOfJsProject = projects.find(p => p.id === toolId)
    if (bestOfJsProject !== undefined) {
        return bestOfJsProject.name
    }

    return getWording(`tools.${toolId}`)
}
