import { readFileSync } from "fs";
import revRewrite from 'gulp-rev-rewrite';
export const rewriteFiles = () => {
  const manifest = readFileSync('dist/rev.json');
  app.gulp.src(`${app.paths.stylesFolder.dist}/*.css`)
    .pipe(revRewrite({
      manifest
    }))
    .pipe(app.gulp.dest(app.paths.stylesFolder.dist))
    return app.gulp.src(`${app.paths.base.build}/**/*.html`)
    .pipe(revRewrite({
      manifest
    }))
    .pipe(app.gulp.dest(app.paths.base.build))
};