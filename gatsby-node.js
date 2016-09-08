// export.postBuild = function(pages, callback) {
//   // perform actions on pages here
//   callback()
// }

exports.modifyWebpackConfig = function(config, env) {
  config.loader('csv', function(cfg) {
    cfg.test = /\.csv$/
    cfg.loader = 'dsv-loader'
    return cfg
  })

  config.removeLoader('md')
  config.loader('md', function(cfg) {
    cfg.test = /\.md$/
    cfg.loader = 'babel-loader!reactdown/webpack'
    return cfg
  })
  
  return config
}