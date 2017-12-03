const yaml = require('js-yaml')
const fs = require('fs')

const nav = yaml.safeLoad(fs.readFileSync('./src/data/nav.yaml', 'utf8'))

exports.modifyWebpackConfig = function({ config }) {
    config.loader('csv', cfg => {
        cfg.test = /\.csv$/
        cfg.loader = 'dsv-loader'
        return cfg
    })

    config.removeLoader('md')
    config.loader('md', cfg => {
        cfg.test = /\.md$/
        cfg.loader = 'babel-loader!reactdown/webpack'
        return cfg
    })

    return config
}

const slugify = s => s.toLowerCase().replace(' ', '-')

exports.createPages = async ({ boundActionCreators }) => {
    const { createRedirect } = boundActionCreators

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
