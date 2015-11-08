var path = require('path')

module.exports = function (source) {
  if (this.cacheable) this.cacheable()
  var STYLE = /<style(\s+[^>]*)?>\n?([^<]*(?:<(?!\/style\s*>)[^<]*)*)<\/style\s*>/gi // from riot/compiler
  var PREPROCESSOR = /\stype="text\/([a-z]*)"/
  var opts = {
    mode: this.query.substring(1),
    filename: path.basename(this.resourcePath)
  }
  var unstyledTag, loader
  var styles = []

  unstyledTag = source.replace(STYLE, function (_, attrs, style) {
    // style mode
    if (opts.mode === 'style') {
      styles.push(style)
    }
    // normal mode
    loader = attrs ? '!' + attrs.match(PREPROCESSOR)[1] : ''
    return ''
  })

  // style mode
  if (opts.mode === 'style') {
    return styles.join('\n')
  }
  // normal mode
  var requireStr = 'require("!!style!css' + loader + '!riotjs-style-plus-loader?style!./' + opts.filename + '")'
  return [requireStr, unstyledTag].join('\n')
}
