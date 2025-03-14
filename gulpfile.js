import gulp from 'gulp';
import browserSync from 'browser-sync';
import { paths } from './gulp/config/paths.js';
import { clean } from './gulp/tasks/clean.js';
import { htmlFilesInclude } from './gulp/tasks/html-include.js';
import { styles } from './gulp/tasks/styles.js';
import { assets } from './gulp/tasks/assets.js';
import { images } from './gulp/tasks/images.js';
import { avifImages } from './gulp/tasks/avif-images.js';
import { webpImages } from './gulp/tasks/webp-images.js';

global.app = {
  gulp,
  isProduction: process.argv.includes('build') || process.argv.includes('--build'),
  paths,
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: `${app.paths.base.build}`
    },
    notify: false,
    port: 3000,
  });
  gulp.watch(`${app.paths.htmlLayoutFolder.src}/*.html`, htmlFilesInclude);
  gulp.watch(`${app.paths.base.src}/*.html` , htmlFilesInclude);
  gulp.watch(app.paths.stylesFolder.src, styles);
  gulp.watch(`${app.paths.assetsFolder.src}/**`, assets);
  gulp.watch(`${app.paths.imagesFolder.src}/**/**.{jpg,jpeg,png,svg}`, images);
  gulp.watch(`${app.paths.imagesFolder.src}/**/**.{jpg,jpeg,png}`, avifImages);
  gulp.watch(`${app.paths.imagesFolder.src}/**/**.{jpg,jpeg,png}`, webpImages);
};

const dev = gulp.series(clean, htmlFilesInclude, styles, assets, images, avifImages, webpImages, watchFiles);
const build = gulp.series(clean, htmlFilesInclude, styles, assets, images, avifImages, webpImages,);

export { dev }
export { build }

gulp.task('default', dev);