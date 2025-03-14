import gulpif from 'gulp-if';
import newer from 'gulp-newer';
import through2 from 'through2';
import sharp from 'sharp';
import path from 'path';

export const images = () => {
  return app.gulp.src([`${app.paths.imagesFolder.src}/**/**.{jpg,jpeg,png,svg}`], { encoding: false })
    .pipe(newer(app.paths.imagesFolder.dist))
    .pipe(gulpif(app.isProduction, 
      through2.obj(function(file, enc, cb) {
        if (file.isNull() || file.isDirectory()) {
          this.push(file);
          return cb();
        }
        if (path.extname(file.path).toLowerCase() === '.svg') {
          this.push(file);
          return cb();
        }
        const ext = path.extname(file.path).toLowerCase();
        try {
          const sharpInstance = sharp(file.contents);
          if (ext === '.jpg' || ext === '.jpeg') {
            sharpInstance.jpeg({ quality: 60, progressive: true });
          } else if (ext === '.png') {
            sharpInstance.png({ compressionLevel: 9, progressive: true });
          }
          sharpInstance.toBuffer()
            .then(data => {
              file.contents = data;
              this.push(file);
              cb();
            })
            .catch(err => {
              console.error(`Image optimization error: ${file.path}`, err);
              this.push(file);
              cb();
            });
        } catch (err) {
          console.error(`Error processing image: ${file.path}`, err);
          this.push(file);
          cb();
        }
      })
    ))
    .pipe(app.gulp.dest(app.paths.imagesFolder.dist));
};