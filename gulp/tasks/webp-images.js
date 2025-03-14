import webp from 'gulp-webp';
export const webpImages = () => {
  return app.gulp.src([`${app.paths.imagesFolder.src}/**/**.{jpg,jpeg,png}`],  { encoding: false })
    .pipe(webp({
      quality: 50,
      method: 5
    }))
    .pipe(app.gulp.dest(app.paths.imagesFolder.dist))
};