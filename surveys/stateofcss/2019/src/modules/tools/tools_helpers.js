export const getToolDescription = (block, resources, translate) => {
    let description
    if (resources.github && resources.github.description) {
        description = resources.github.description
    } else {
        description = translate(`block.${block.id}.description`)
    }

    return description
}
