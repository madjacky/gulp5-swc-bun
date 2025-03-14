import gulpif from 'gulp-if';
import newer from 'gulp-newer';

export const images = () => {
  return app.gulp.src([`${app.paths.imagesFolder.src}/**/**.{jpg,jpeg,png,svg}`], { encoding: false })
    // .pipe(newer(app.paths.imagesFolder.dist))
    // .pipe(gulpif(app.isProduction, ))
    .pipe(app.gulp.dest(app.paths.imagesFolder.dist))
};