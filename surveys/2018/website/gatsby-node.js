const yaml = require('js-yaml')
const fs = require('fs')
const path = require(`path`)
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

const replaceAll = function(s, search, replacement) {
    const newString = s.replace(new RegExp(search, 'g'), replacement)
    return newString
}

const slugify = (s, dashToUnderscore = false) => {
    const slug = replaceAll(s.toLowerCase(), ' ', '-')
    const slugUnderscore = replaceAll(slug, '-', '_')
    return dashToUnderscore ? slugUnderscore : slug
}

exports.createPages = async ({ actions }) => {
    const { createRedirect, createPage } = actions

    const exclusions = [
        'Introduction',
        'Connections',
        'Other Tools',
        'Opinions',
        'Demographics',
        'Conclusion',
        'Support Us'
    ]

    nav.filter(item => !exclusions.includes(item.label)).forEach(item => {
        const sectionSlug = slugify(item.label)

        if (item.subPages) {

            const firstSubSectionSlug = slugify(item.subPages[0])
            createRedirect({
                fromPath: `/${sectionSlug}/`,
                redirectInBrowser: true,
                toPath: `/${sectionSlug}/${firstSubSectionSlug}/`
            })
            createRedirect({
                fromPath: `/${sectionSlug}`,
                redirectInBrowser: true,
                toPath: `/${sectionSlug}/${firstSubSectionSlug}/`
            })

            let subPageContext = {}

            item.subPages.forEach(subPage => {
                const subSectionSlug = slugify(subPage)

                const pagePath = `/${sectionSlug}/${subSectionSlug}`
                let templateName
                switch (subPage) {
                    case 'Overview':
                        templateName = 'Overview'
                        break

                    case 'Other Libraries':
                        templateName = 'OtherLibraries'
                        break

                    case 'Conclusion':
                        templateName = 'Conclusion'
                        break

                    default:
                        templateName = 'Library'
                        subPageContext = {
                            section: slugify(item.label),
                            tool: slugify(subPage)
                        }
                        break
                }

                createPage({
                    path: pagePath,
                    component: path.resolve(
                        `./src/components/templates/${templateName}Template.js`
                    ),
                    context: subPageContext
                })
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
