export const assets = () => {
  return app.gulp.src(`${app.paths.assetsFolder.src}/**`, { encoding: false })
    .pipe(app.gulp.dest(app.paths.assetsFolder.dist))
};