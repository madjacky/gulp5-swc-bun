import path from 'path';
import {deleteAsync} from 'del';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import zip from 'gulp-zip';

const rootFolder = path.basename(path.resolve());

export const zipFiles = () => {
  deleteAsync([`${app.paths.base.build}/*.zip`]);
  return app.gulp.src(`${app.paths.base.build}/**/*.*`, { encoding: false })
    .pipe(plumber(
      notify.onError({
        title: "ZIP",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(zip(`${rootFolder}.zip`))
    .pipe(app.gulp.dest(app.paths.base.build));
};