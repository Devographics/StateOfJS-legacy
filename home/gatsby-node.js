const bestofjsNameToSlug = require('./src/helpers/bestofjs-slugify')
const got = require('got')
const crypto = require('crypto')

/**
 * Fix case for pages path, it's not obvious on OSX which is case insensitive,
 * but on some environments (eg. travis), it's a problem.
 *
 * Many pages are created from components, and we use upper first in that case
 * for the file name, so when gatsby generates the static page, it has the same name.
 *
 * Implement the Gatsby API “onCreatePage”.
 * This is called after every page is created.
 */
exports.onCreatePage = ({ page, boundActionCreators }) => {
    const { createPage, deletePage } = boundActionCreators

    return new Promise(resolve => {
        const newPage = Object.assign({}, page, {
            path: page.path.toLowerCase()
        })

        if (newPage.path !== page.path) {
            deletePage(page)
            createPage(newPage)
        }

        resolve()
    })
}


/*
Add `Project` nodes to the application GraphQL data store
See `allProject` query on http://localhost:8000/___graphql
We fetch about 500 projects from Best of JavaScript
*/
exports.sourceNodes = async ({ boundActionCreators }) => {
    const { createNode } = boundActionCreators
    const url = 'https://bestofjs-api-v2.firebaseapp.com/projects.json'
    const data = await got(url, { json: true }).then(r => r.body)
    const { projects } = data
    const sortedProjects = projects
        .filter(project => project.stars >= 5000)
        .sort((a, b) => (a.stars > b.stars ? -1 : 1))
    const nodes = sortedProjects.map(project => ({
        id: bestofjsNameToSlug(project.name),
        name: project.name,
        stars: project.stars,
        parent: null,
        children: [],
        internal: {
            type: `Project`,
            contentDigest: crypto
                .createHash(`md5`)
                .update(JSON.stringify(project))
                .digest(`hex`),
        },
        name: project.name,
    }))
    nodes.forEach(node => createNode(node))
}
