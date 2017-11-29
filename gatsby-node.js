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

/*

    This code were used to build images to share on social platforms.
    It may be re-used.

const stream = require('stream')
const cheerio = require('cheerio')
const CloudConvert = require('cloudconvert')

const cloudconvert = new CloudConvert(
    'AgdEGASfC2FDKiTMeaGgBnol1uZ7mzf57TXO7NearQ2dcaj7AGsc2rHqsFr8plYN-1gH3mr1MWNVhUMiYr04Fw'
)

exports.onPostBuild = function(args, pluginOptions) {
    // perform actions on pages here
    const svgpath = 'public/svgcontainer/index.html'

    fs.readFile(svgpath, 'utf8', (err1, data) => {
        if (err1) throw err1

        // parse SVGContainer file
        const $ = cheerio.load(data)
        const svgs = $('.svg-block')

        // iterate over SVG blocks
        svgs.each((i, svg) => {
            const svgId = $(svg).attr('id')
            // insert background color rect
            $(svg)
                .find('.recharts-surface')
                .prepend('<rect x="0" y="0" width="100%" height="100%" fill="#fffef0" />')
            const svgContents = $(svg)
                .find('.recharts-wrapper')
                .html()
            const svgPath = `public/exports/svg/${svgId}.svg`
            const pngPath = `public/exports/png/${svgId}.png`

            console.log(`// exporting ${svgId}…`)

            // export SVG

            fs.exists(svgPath, exists => {
                const options = exists ? {} : { flag: 'wx' }
                fs.writeFile(svgPath, svgContents, options, (err, data) => {
                    if (err) console.log(err)
                })
            })

            // export PNG

            // see https://cloudconvert.com/api/convert/svg-to-png
            try {
                cloudconvert
                    .convert({
                        inputformat: 'svg',
                        outputformat: 'png',
                        input: 'raw',
                        filename: `${svgId}.svg`,
                        file: svgContents,
                    })
                    .pipe(fs.createWriteStream(pngPath))
            } catch (err) {
                console.log(err)
            }
        })
    })
}
*/
