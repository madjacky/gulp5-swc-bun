import rev from 'gulp-rev';
import revdel from 'gulp-rev-delete-original';

export const cacheFiles = () => {
  return app.gulp.src(`${app.paths.base.build}/**/*.{css,js,woff2,jpg,jpeg,webp,avif,png,svg}`, { base: app.paths.base.build, encoding: false })
    .pipe(rev())
    .pipe(revdel())
    .pipe(app.gulp.dest(app.paths.base.build))
    .pipe(rev.manifest('rev.json'))
    .pipe(app.gulp.dest(app.paths.base.build))
};