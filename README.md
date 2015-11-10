# riotjs-style-plus-loader
riotjs-loader extension which enables @import & url() in your style tags.

## Install
```sh
npm install --save-dev riotjs-style-plus-loader riotjs-loader css-loader style-loader
```

## Usage

#### webpack.config.js

```js
module: {
  loaders: [
    // as you know
    { test: /\.tag$/, loader: 'riotjs!riotjs-style-plus' },
    // and the file-loader or url-loader required for url()
    { test: /\.png$|\.jpg$/, loader: 'file?name=[path][name].[ext]' }
  ]
}
```

 Now you can use @import & url() in your style tags! Pure CSS, Stylus, Sass, Less are supported. **You still need to install corresponding loaders and packages for pre-processors. (e.g. stylus-loader, stylus)**

#### Stylus sample

```html
<my-sample>

  <p>Hello!<p>

  <style type="stylus">
    @import "common.styl"
    my-sample
      p
        background url('./background.png')
  </style>
  
</my-sample>
```

## Note

- The scoped CSS is unsupported.
- Using multiple style tags are buggy.
- Not tested very well.

## License

MIT
