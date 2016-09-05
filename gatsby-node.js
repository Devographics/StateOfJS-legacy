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
  return config
}