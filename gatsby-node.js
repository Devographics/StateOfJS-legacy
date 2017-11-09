const fs = require('fs')
const cheerio = require('cheerio')
const CloudConvert = require('cloudconvert')
const stream = require('stream')

const nav = require('./src/data/nav.json')

const cloudconvert = new CloudConvert('AgdEGASfC2FDKiTMeaGgBnol1uZ7mzf57TXO7NearQ2dcaj7AGsc2rHqsFr8plYN-1gH3mr1MWNVhUMiYr04Fw')

// export.postBuild = function(pages, callback) {
//   // perform actions on pages here
//   callback()
// }

exports.modifyWebpackConfig = function ({config, stage}) {
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

exports.onPostBuild = function (args, pluginOptions) {

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
      $(svg).find('.recharts-surface').prepend('<rect x="0" y="0" width="100%" height="100%" fill="#fffef0" />')
      const svgContents = $(svg).find('.recharts-wrapper').html()
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
        cloudconvert.convert({
          inputformat: 'svg',
          outputformat: 'png',
          input: 'raw',
          filename: `${svgId}.svg`,
          file: svgContents,
        }).pipe(fs.createWriteStream(pngPath))
      } catch (err) { console.log(err) }
    })
  })

}

const slugify = s => s.toLowerCase().replace(' ', '-')

exports.createPages = async ({graphql, boundActionCreators}) => {
  const {createPage, createRedirect} = boundActionCreators;

  nav.items.forEach(item => {
    createRedirect({
      fromPath: `/2017/${slugify(item.label)}/`,
      redirectInBrowser: true,
      toPath: `/2017/${slugify(item.label)}/${slugify(item.subPages[0])}`,
    });
    createRedirect({
      fromPath: `/2017/${slugify(item.label)}`,
      redirectInBrowser: true,
      toPath: `/2017/${slugify(item.label)}/${slugify(item.subPages[0])}`,
    });
  });
}
