import gulpif from 'gulp-if';
import newer from 'gulp-newer';
import through2 from 'through2';
import sharp from 'sharp';
import path from 'path';

export const avifImages = () => {
  sharp.cache(false);

  return app.gulp.src([`${app.paths.imagesFolder.src}/**/**.{jpg,jpeg,png}`], { encoding: false })
    .pipe(newer({
      dest: app.paths.imagesFolder.dist,
      ext: '.avif'
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
        const avifOptions = {
          quality: 50,
          speed: app.isProduction ? 3 : 10,
          chromaSubsampling: '4:2:0'
        };
        if (ext === '.png') {
          avifOptions.lossless = false;
          avifOptions.quality = 50;
        }
        
        sharp(file.contents)
          .avif(avifOptions)
          .toBuffer()
          .then(data => {
            const avifFile = file.clone();
            avifFile.path = path.join(dirname, `${filename}.avif`);
            avifFile.contents = Buffer.from(data);
            this.push(avifFile);
            cb();
          })
          .catch(err => {
            console.error(`AVIF conversion error: ${file.path}`, err);
            cb();
          });
      } catch (err) {
        console.error(`Error processing AVIF: ${file.path}`, err);
        cb();
      }
    }))
    .pipe(app.gulp.dest(app.paths.imagesFolder.dist));
};