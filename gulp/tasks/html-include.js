import browserSync from 'browser-sync';
import fileinclude from 'gulp-file-include';

export const htmlFilesInclude = () => {
  return app.gulp.src([`${app.paths.base.src}/*.html`])
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file',
      maxRecursion: 100
    }))
    .pipe(app.gulp.dest(app.paths.base.build))
    .pipe(browserSync.stream());
};