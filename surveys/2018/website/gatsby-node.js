const yaml = require('js-yaml')
const fs = require('fs')
const path = require(`path`)
const { findIndex, findLastIndex, omit } = require('lodash')

const nav = yaml.safeLoad(fs.readFileSync('../config/nav.yml', 'utf8'))
const blocks = yaml.safeLoad(fs.readFileSync('../config/blocks.yml', 'utf8'))
const locales = yaml.safeLoad(fs.readFileSync('../config/locales.yml', 'utf8'))

const getChildPageType = id => {
    if (['overview', 'other-libraries', 'tool', 'conclusion'].includes(id)) {
        return id
    }

    return 'tool'
}

const getChildPageTemplate = type => {
    let template
    switch (type) {
        case 'overview':
            template = 'modules/sections/SectionIntroduction'
            break

        case 'other-libraries':
            template = 'modules/sections/SectionOtherTools'
            break

        case 'conclusion':
            template = 'modules/sections/SectionConclusion'
            break

        case 'tool':
            template = 'modules/tools/Tool'
            break

        default:
            throw new Error(`no template defined for child page type: ${type}`)
    }

    return path.resolve(`./src/${template}Template.js`)
}

let enhancedNav = null

const enhanceNav = async () => {
    if (enhancedNav !== null) return enhancedNav

    const flat = []
    const hierarchy = []

    nav.forEach(item => {
        const page = {
            id: item.id,
            path: `/${item.id}/`,
            type: 'custom',
            is_hidden: item.hide === true
        }
        if (page.id === 'home') {
            page.path = '/'
        }
        if (blocks[item.id] !== undefined) {
            page.blocks = blocks[item.id]
        }
        if (item.children !== undefined && item.children.length > 0) {
            page.path = `/${item.id}/${item.children[0]}/`
            page.type = 'section'
            page.children = []
        }
        flat.push(page)
        hierarchy.push(page)

        if (item.children !== undefined) {
            item.children.forEach(childPageId => {
                const childPageType = getChildPageType(childPageId)

                const childPage = {
                    id: childPageId,
                    path: `/${item.id}/${childPageId}/`,
                    type: childPageType,
                    section: item.id,
                    blocks: [...blocks[childPageType]]
                }
                if (childPageType === 'tool') {
                    childPage.tool = childPageId
                }

                flat.push(childPage)
                page.children.push(childPage)
            })
        }
    })

    // assign prev/next page using flat pages
    flat.forEach(page => {
        const index = findIndex(flat, p => p.path === page.path)
        const previous = flat[index - 1]
        if (previous !== undefined && previous.is_hidden !== true) {
            page.previous = omit(previous, [
                'path',
                'children',
                'blocks',
                'previous',
                'next',
                'is_hidden'
            ])
            page.previous.basePath = previous.path
        }

        // we must use last index here because of section overview
        // which is duplicated
        const lastIndex = findLastIndex(flat, p => p.path === page.path)
        const next = flat[lastIndex + 1]
        if (next !== undefined && next.is_hidden !== true) {
            page.next = omit(next, ['path', 'children', 'blocks', 'previous', 'next', 'is_hidden'])
            page.next.basePath = next.path
        }
    })

    await fs.writeFileSync('../config/enhanced_nav.yml', yaml.dump(hierarchy))

    enhancedNav = { hierarchy, flat }

    return enhancedNav
}

const localizedPath = (path, locale) =>
    locale.path === 'default' ? path : `/${locale.path}${path}`

const getPageContext = page => {
    const context = omit(page, ['path', 'children', 'is_hidden', 'blocks'])
    context.basePath = page.path

    return context
}

const createBlockPages = async (page, context, createPage) => {
    if (page.blocks === undefined || page.blocks.length === 0) {
        return
    }

    page.blocks.forEach(block => {
        locales.forEach(locale => {
            createPage({
                path: localizedPath(`${page.path}${block}`, locale),
                component: path.resolve(`./src/core/share/ShareBlockTemplate.js`),
                context: {
                    ...context,
                    redirect: `${localizedPath(page.path, locale)}#${block}`,
                    block,
                    locale: locale.locale,
                    localePath: locale.path === 'default' ? '' : `/${locale.path}`
                }
            })
        })
    })
}

exports.createPages = async ({ actions: { createPage } }) => {
    const { flat } = await enhanceNav()

    flat.forEach(page => {
        const context = getPageContext(page)

        if (page.type !== 'custom' && page.type !== 'section') {
            const template = getChildPageTemplate(page.type)

            locales.forEach(locale => {
                createPage({
                    path: localizedPath(page.path, locale),
                    component: template,
                    context: {
                        ...context,
                        locale: locale.locale,
                        localeLabel: locale.label,
                        localePath: locale.path === 'default' ? '' : `/${locale.path}`
                    }
                })
            })
        }

        createBlockPages(page, context, createPage)
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
exports.onCreatePage = async ({ page, actions }) => {
    const { createPage, deletePage } = actions

    const { flat } = await enhanceNav()

    const pagePath = page.path.toLowerCase()
    const matchingPage = flat.find(p => p.path === pagePath)

    // if there's no matching page
    // it means we're dealing with an internal page
    // thus, we don't create one for each locale
    if (matchingPage === undefined) {
        if (pagePath !== page.path) {
            await deletePage(page)
            await createPage({
                ...page,
                path: pagePath
            })
        }
        return
    }

    // add context, required for pagination
    const context = {
        ...page.context,
        ...getPageContext(matchingPage)
    }
    const newPage = {
        ...page,
        path: pagePath,
        context
    }

    await deletePage(page)

    // create page for each available locale
    for (let locale of locales) {
        await createPage({
            ...newPage,
            path: localizedPath(newPage.path, locale),
            context: {
                ...newPage.context,
                locale: locale.locale,
                localeLabel: locale.label,
                localePath: locale.path === 'default' ? '' : `/${locale.path}`
            }
        })
    }

    await createBlockPages(page, context, createPage)
}

// Allow absolute imports
exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, 'src'), 'node_modules']
        }
    })
}
