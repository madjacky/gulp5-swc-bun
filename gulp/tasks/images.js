import gulpif from 'gulp-if';
import newer from 'gulp-newer';
import through2 from 'through2';
import sharp from 'sharp';
import path from 'path';

export const images = () => {
  sharp.cache(false);
  return app.gulp.src([`${app.paths.imagesFolder.src}/**/**.{jpg,jpeg,png,svg}`], { encoding: false })
    .pipe(newer(app.paths.imagesFolder.dist))
    .pipe(gulpif(app.isProduction,
      through2.obj(function(file, enc, cb) {
        if (file.isNull() || file.isDirectory()) {
          this.push(file);
          return cb();
        }
        const ext = path.extname(file.path).toLowerCase();
        if (ext === '.svg') {
          this.push(file);
          return cb();
        }
        
        try {
          const sharpInstance = sharp(file.contents);
          sharpInstance.withMetadata(false); 
          if (ext === '.jpg' || ext === '.jpeg') {
            sharpInstance.jpeg({ 
              quality: 75,
              progressive: true, 
              mozjpeg: true,
              trellisQuantisation: true,
              overshootDeringing: true,
              optimizeScans: true
            });
          } else if (ext === '.png') {
            sharpInstance.png({ 
              compressionLevel: 9,
              progressive: true,
              palette: true,
              quality: 60,
              dither: 0.5
            });
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