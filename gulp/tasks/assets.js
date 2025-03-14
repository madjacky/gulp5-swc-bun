export const assets = () => {
  return app.gulp.src([
    `${app.paths.assetsFolder.src}/**`,
    `!${app.paths.assetsFolder.src}/images/**/*.{jpg,jpeg,png,svg}`
  ], { encoding: false })
    .pipe(app.gulp.dest(app.paths.assetsFolder.dist))
};