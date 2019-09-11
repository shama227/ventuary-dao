const mix = require('laravel-mix');

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

mix.js('src/js/app.js', 'dist/js')
    .sass('src/sass/app.scss', 'dist/css')
.disableNotifications()
.browserSync({
    files: [
        'dist/js/**/*.js',
        'dist/css/**/*.css',
        'dist/index.html'
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
