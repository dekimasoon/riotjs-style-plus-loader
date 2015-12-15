var path = require('path')

module.exports = function (source, testOpts) {
  var STYLE = /<style(\s+[^>]*)?>\n?([^<]*(?:<(?!\/style\s*>)[^<]*)*)<\/style\s*>/gi // from riot/compiler
  var PREPROCESSOR = /\stype="([a-z/]*)"/
  var opts = testOpts || {
    mode: this.query.substring(1),
    filename: path.basename(this.resourcePath)
  }
  var unstyledTag
  var loader = ''
  var styles = []

  if (this.cacheable) this.cacheable()

  unstyledTag = source.replace(STYLE, function (_, attrs, style) {
    // style mode
    if (opts.mode === 'style') {
      styles.push(style)
    }
    // normal mode
    if (attrs && PREPROCESSOR.test(attrs)) {
      loader = '!' + attrs.match(PREPROCESSOR)[1].replace('text/', '')
    }
    return ''
  })

  // style mode
  if (opts.mode === 'style') {
    return styles.join('\n')
  }

  // strip mode
  if (opts.mode === 'strip') {
    return unstyledTag
  }

  // normal mode
  var requireStr = 'require("!!style!css' + loader + '!riotjs-style-plus-loader?style!./' + opts.filename + '")'
  return [requireStr, unstyledTag].join('\n')
}
