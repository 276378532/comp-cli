const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const striptags = require('./strip-tags')
const md = require('markdown-it')()

const wrap = function(render) {
  return function() {
    return render.apply(this, arguments)
      .replace('<code v-pre class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">')
  }
}

function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16))
  })
  return str
}

module.exports = {
  devServer: {
    hot: true,
    port: 3000,
    contentBase: './dist',
    open: true,
    host: '127.0.0.1'
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js',
      "@": path.resolve(__dirname, '../examples')
    },
    extensions: [
      '.js',
      '.vue',
      '.md'
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader'
          },
          {
            loader: 'thread-loader'
          },
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              },
            }
          }
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js')
          }
        ]
      },
    //   {
    //     test: /\.md$/,
    //     loader: 'vue-markdown-loader',
    //     options: {
    //       use: [
    //         [require('markdown-it-container'), 'demo', {
    //           validate: function(params) {
    //             return params.trim().match(/^demo\s*(.*)$/)
    //           },
        
    //           render: function(tokens, idx) {
    //             var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
    //             if (tokens[idx].nesting === 1) {
    //               var description = (m && m.length > 1) ? m[1] : ''
    //               var content = tokens[idx + 1].content
    //               var html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1')
    //               var script = striptags.fetch(content, 'script')
    //               var style = striptags.fetch(content, 'style')
    //               var jsfiddle = { html: html, script: script, style: style }
    //               var descriptionHTML = description
    //                 ? md.render(description)
    //                 : ''
        
    //               jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle))
        
    //               return `<demo-block class="demo-box" :jsfiddle="${jsfiddle}">
    //                         <div class="source" slot="source">${html}</div>
    //                         ${descriptionHTML}
    //                         <div class="highlight" slot="highlight">`
    //             }
    //             return '</div></demo-block>\n'
    //           }
    //         }],
    //         [require('markdown-it-container'), 'tip'],
    //         [require('markdown-it-container'), 'warning']
    //       ],
    //       preprocess: function(MarkdownIt, source) {
    //         MarkdownIt.renderer.rules.table_open = function() {
    //           return '<table class="table">';
    //         };
    //         MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence)
    //         return source;
    //       }
    //     }
    // },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader'
          },
          {
            loader: 'thread-loader'
          },
          {
            loader: 'babel-loader'
          }
        ]
      },

      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
}
