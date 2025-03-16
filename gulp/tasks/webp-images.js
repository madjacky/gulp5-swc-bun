import gulpif from 'gulp-if';
import newer from 'gulp-newer';
import through2 from 'through2';
import sharp from 'sharp';
import path from 'path';

export const webpImages = () => {
  sharp.cache(false);
  return app.gulp.src([`${app.paths.imagesFolder.src}/**/**.{jpg,jpeg,png}`], { encoding: false })
    .pipe(newer({
      dest: app.paths.imagesFolder.dist,
      ext: '.webp'
    }))
    .pipe(through2.obj(function(file, enc, cb) {
      if (file.isNull() || file.isDirectory()) {
        cb();
        return;
      }
      const ext = path.extname(file.path).toLowerCase();
      const filename = path.basename(file.path, ext);
      const dirname = path.dirname(file.path);
      try {
        const webpOptions = {
          quality: 50,
          smartSubsample: true,
          effort: app.isProduction ? 6 : 1
        };
        if (ext === '.png') {
          webpOptions.lossless = false;
          webpOptions.nearLossless = true;
          webpOptions.quality = 50;
        }
        sharp(file.contents)
          .webp(webpOptions)
          .toBuffer()
          .then(data => {
            const webpFile = file.clone();
            webpFile.path = path.join(dirname, `${filename}.webp`);
            webpFile.contents = Buffer.from(data);
            this.push(webpFile);
            cb();
          })
          .catch(err => {
            console.error(`WebP conversion error: ${file.path}`, err);
            cb();
          });
      } catch (err) {
        console.error(`Error processing WebP: ${file.path}`, err);
        cb();
      }
    }))
    .pipe(app.gulp.dest(app.paths.imagesFolder.dist));
};