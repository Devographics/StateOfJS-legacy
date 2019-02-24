import bestOfJsData from '../../data/bestofjs'

export const getToolName = (id, translate) => {
    const bestOfJsProject = bestOfJsData.projects.find(p => p.slug === id)
    if (bestOfJsProject !== undefined) {
        return bestOfJsProject.name
    }

    return translate(`tool.${id}`)
}
