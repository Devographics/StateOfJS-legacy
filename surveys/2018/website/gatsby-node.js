const yaml = require('js-yaml')
const fs = require('fs')

const nav = yaml.safeLoad(fs.readFileSync('./src/data/nav.yaml', 'utf8'))

/*

TODO: use https://www.gatsbyjs.org/docs/actions/#setWebpackConfig
see: https://www.gatsbyjs.org/docs/migrating-from-v1-to-v2/#change-modifywebpackconfig-to-oncreatewebpackconfig

(not sure if we still need this though…)
*/

// exports.modifyWebpackConfig = function({ config }) {
//     config.removeLoader('md')
//     config.loader('md', cfg => {
//         cfg.test = /\.md$/
//         cfg.loader = 'html!markdown'

//         return cfg
//     })

//     return config
// }

const slugify = s => s.toLowerCase().replace(' ', '-')

exports.createPages = async ({ actions }) => {
    const { createRedirect } = actions

    nav.forEach(item => {
        if (item.subPages) {
            createRedirect({
                fromPath: `/${slugify(item.label)}/`,
                redirectInBrowser: true,
                toPath: `/${slugify(item.label)}/${slugify(item.subPages[0])}`
            })
            createRedirect({
                fromPath: `/${slugify(item.label)}`,
                redirectInBrowser: true,
                toPath: `/${slugify(item.label)}/${slugify(item.subPages[0])}`
            })
        }
    })
}

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
exports.onCreatePage = ({ page, actions }) => {
    const { createPage, deletePage } = actions

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
