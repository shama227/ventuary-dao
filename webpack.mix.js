const mix = require('laravel-mix');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs')
const vars = require('./src/vars')
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            inject: false,
            minify: {
              conservativeCollapse: true,
              removeRedundantAttributes: true,
              removeComments: true,
              collapseInlineTagWhitespace: true,
              collapseWhitespace: true,
            }
        })
    })
}

const htmlPlugins = generateHtmlPlugins('./src/template/pages');

mix
  .webpackConfig({
      module: {
          rules: [
            {
              test: /\.njk|nunjucks/,
              use: ['html-loader', { // use html-loader or html-withimg-loader to handle inline resource
                loader: 'nunjucks-webpack-loader', // add nunjucks-webpack-loader
                options : {
                  context: {
                    ...vars,
                  },
                  alias: { // add alias and you can use it in your template
                    pages : path.resolve(__dirname, './src/template/pages'),
                    components: path.resolve(__dirname, './src/template/components'),
                    layouts: path.resolve(__dirname, './src/template/layouts')
                  },
                  tags: { // if you want to use different tokens
                    blockStart: '{%',
                    blockEnd: '%}',
                    variableStart: '{{',
                    variableEnd: '}}',
                    commentStart: '{#',
                    commentEnd: '#}'
                  }
                }
              }]
            },
          ]
      },
      plugins: [
          new CopyWebpackPlugin([
          {
              from: './src/assets/favicon',
              to: './favicon'
          },
          {
              from: './src/assets/img',
              to: './img'
          },
          {
              from: './src/assets/favicon.ico',
              to: './favicon.ico'
          },
          {
              from: './src/assets/robots.txt',
              to: './robots.txt'
          },
          {
              from: './src/assets/web.config',
              to: './web.config'
          },
          ]),
      ].concat(htmlPlugins)
  })
  .js('src/js/app.js', 'dist/js')
    .sass('src/sass/app.scss', 'dist/css')
  .setPublicPath('dist')
.disableNotifications()
.browserSync({
    files: [
        'dist/**/*.js',
        'dist/**/*.css',
        'dist/**/*.html'
    ],
    proxy:
        {
            target: 'http://ventuary-dao.loc/',
            ws: true
        },
    logPrefix: 'ventuary-dao.loc',
    host: 'ventuary-dao.loc',
    port: 3000,
    open: false,
    notify: false,
    ghostMode: {
        clicks: true,
        forms: true,
        scroll: true
    }
})
