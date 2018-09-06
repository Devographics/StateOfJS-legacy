const yaml = require('js-yaml')
const fs = require('fs')
const crypto = require('crypto')
const got = require('got')

const bestofjsNameToSlug = require('./src/helpers/bestofjs-slugify')
const nav = yaml.safeLoad(fs.readFileSync('./src/data/nav.yaml', 'utf8'))

exports.modifyWebpackConfig = function({ config }) {
    config.removeLoader('md')
    config.loader('md', cfg => {
        cfg.test = /\.md$/
        cfg.loader = 'html!markdown'

        return cfg
    })

    return config
}

const slugify = s => s.toLowerCase().replace(' ', '-')

// create redirects to 2017 site
// exports.createPages = async ({ boundActionCreators }) => {
//     const { createRedirect } = boundActionCreators

//     createRedirect({
//         fromPath: `/2017/`,
//         redirectInBrowser: true,
//         toPath: `https://2017.stateofjs.com/2017`,
//     })

//     nav.forEach(item => {
//         if (item.subPages) {
//             createRedirect({
//                 fromPath: `/2017/${slugify(item.label)}/`,
//                 redirectInBrowser: true,
//                 isPermanent: true,
//                 toPath: `https://2017.stateofjs.com/2017/${slugify(item.label)}/${slugify(item.subPages[0])}`,
//             })
//             createRedirect({
//                 fromPath: `/2017/${slugify(item.label)}`,
//                 redirectInBrowser: true,
//                 isPermanent: true,
//                 toPath: `https://2017.stateofjs.com/2017/${slugify(item.label)}/${slugify(item.subPages[0])}`,
//             })

//             item.subPages.forEach(subpage => {
//                 createRedirect({
//                     fromPath: `/2017/${slugify(item.label)}/${subpage}`,
//                     redirectInBrowser: true,
//                     isPermanent: true,
//                     toPath: `https://2017.stateofjs.com/2017/${slugify(item.label)}/${subpage}`,
//                 })
//                 createRedirect({
//                     fromPath: `/2017/${slugify(item.label)}/${subpage}/`,
//                     redirectInBrowser: true,
//                     isPermanent: true,
//                     toPath: `https://2017.stateofjs.com/2017/${slugify(item.label)}/${subpage}`,
//                 })

//             })
//         }
//     })
// }

exports.createPages = async ({ boundActionCreators }) => {
    const { createRedirect } = boundActionCreators

    createRedirect({
        fromPath: `/2017/`,
        redirectInBrowser: true,
        toPath: `/2017/introduction/`,
    })

    nav.forEach(item => {
        if (item.subPages) {
            createRedirect({
                fromPath: `/2017/${slugify(item.label)}/`,
                redirectInBrowser: true,
                toPath: `/2017/${slugify(item.label)}/${slugify(item.subPages[0])}`,
            })
            createRedirect({
                fromPath: `/2017/${slugify(item.label)}`,
                redirectInBrowser: true,
                toPath: `/2017/${slugify(item.label)}/${slugify(item.subPages[0])}`,
            })
        }
    })
}

/**
 * Fix case for pages path, it's not obvious on OSX which is cas insensitive,
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
            path: page.path.toLowerCase(),
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

// exports.onCreateNode = ({ node, boundActionCreators }) => {
//   const { createNode, createNodeField } = boundActionCreators
//   if (node.type === 'Project') console.log(node)

//   // Transform the new node here and create a new node or
//   // create a new node field.
// }
