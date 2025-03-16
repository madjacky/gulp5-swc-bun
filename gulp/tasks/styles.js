import browserSync from 'browser-sync';
import gulpif from 'gulp-if';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import postcss from 'gulp-postcss';
import atImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export const styles = () => {
  const plugins = [
    atImport(),
    autoprefixer({
      cascade: false,
      grid: true
    })
  ];
  return app.gulp.src(app.paths.stylesFolder.src, { sourcemaps: !app.isProduction })
    .pipe(plumber(
      notify.onError({
        title: "SCSS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(gulpif(app.isProduction, postcss([cssnano()])))
    .pipe(app.gulp.dest(app.paths.stylesFolder.dist, { sourcemaps: '.' }))
    .pipe(browserSync.stream());
};