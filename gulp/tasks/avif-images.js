import gulpAvif from 'gulp-avif';
export const avifImages = () => {
  return app.gulp.src([`${app.paths.imagesFolder.src}/**/**.{jpg,jpeg,png}`],  { encoding: false })
    .pipe(gulpAvif({
      quality: 50,
      speed: 5
    }))
    .pipe(app.gulp.dest(app.paths.imagesFolder.dist))
};