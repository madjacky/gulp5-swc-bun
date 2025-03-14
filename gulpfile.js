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
import { svgSprites } from './gulp/tasks/svg-sprite.js';

import { cacheFiles } from './gulp/tasks/cache-files.js';
import { rewriteFiles } from './gulp/tasks/rewrite-files.js';

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
  gulp.watch(app.paths.svgSpritesFolder.src, svgSprites);
};

const dev = gulp.series(clean, htmlFilesInclude, styles, assets, images, avifImages, webpImages, svgSprites, watchFiles);
const build = gulp.series(clean, htmlFilesInclude, styles, assets, images, avifImages, webpImages, svgSprites);
const cache = gulp.series(cacheFiles, rewriteFiles);

export { dev }
export { build }
export { cache }

gulp.task('default', dev);