import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import webpack from 'webpack-stream';

export const scripts = () => {
  return app.gulp.src(app.paths.mainJavascriptFile.src)
    .pipe(plumber(
      notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(webpack({
      mode: app.isProduction ? 'production' : 'development',
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "swc-loader",
              options: {
                sync: true,
                minify: true
              }
            }
          }
        ]
      },
      devtool: !app.isProduction ? 'source-map' : false
    }))
    .on('error', function (err) {
      console.error('SWC ERROR', err);
      this.emit('end');
    })
    .pipe(app.gulp.dest(app.paths.javascriptFolder.dist))
    .pipe(browserSync.stream());
};