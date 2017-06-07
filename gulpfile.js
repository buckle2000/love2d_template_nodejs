const path = require('path');
const gulp = require('gulp');
const fs = require('fs-extra');
const map = require('map-stream');
const ps = require('child_process');
const newer = require('gulp-newer');
const tmp = require('tmp');
const async = require('async');
const gutil = require('gulp-util');

const PATH_SRC = 'src/';
const PATH_DEST = 'build/';

function task_builder(options) {
  return () => {
    return gulp.src(path.join(PATH_SRC, options.glob), { buffer: false })
      .pipe(map((file, cb) => {
        let src = file.path;
        let src_stats = fs.statSync(src);
        let relative = path.relative(PATH_SRC, src);
        let dest = path.join(PATH_DEST, gutil.replaceExtension(relative, options.ext));
        if (fs.existsSync(dest)) {
          let dest_stats = fs.statSync(dest);
          let thing2 = src_stats.mtime;
          let thing = dest_stats.mtime;
          if (thing2 <= thing)
            return cb();
        }
        console.log(relative);
        fs.mkdirs(path.dirname(dest), (err) => {
          if (err) return cb(err);
          if (err) return cb(err);
          let child_process = options.cb(src, dest);
          child_process.on('error', (err) => cb(err));
          child_process.on('exit', () => {
            // the "+1" here solves the problem of that utimes can only set whole number as mtime
            fs.utimesSync(dest, src_stats.atime.getTime() / 1000 + 1, src_stats.mtime.getTime() / 1000 + 1);
            cb();
          });
        });
      }));
  };
}

gulp.task('clean', () => fs.remove(PATH_DEST));

gulp.task('moon', task_builder({
  glob: '**/*.moon',
  ext: '.lua',
  cb: (src, dest) => ps.spawn('moonc', ['-o', dest, src])
}));

gulp.task('tmx', task_builder({
  glob: '**/*.tmx',
  ext: '.lua',
  cb: (src, dest) => ps.spawn('tiled', ['--export-map', 'lua', src, dest])
}));

gulp.task('ase', task_builder({
  glob: '**/*.ase?(prite)',
  ext: '.png',
  cb: (src, dest) => ps.spawn('aseprite', ['-b', src, '--save-as', dest])
}));

// just copy
gulp.task('copy',
  () => gulp.src(path.join(PATH_SRC, '**/*.!(moon|tmx|ase|aseprite)'))
  .pipe(newer(PATH_DEST))
  .pipe(gulp.dest(PATH_DEST)));

gulp.task('build', ['copy', 'moon', 'tmx', 'ase']);

gulp.task('windows', () => {
  async.series([
    (cb) => gulp.start('clean', cb),
    (cb) => gulp.start('build', cb),
    (cb) => {
      // TODO
    }
  ], (err) => { if (err) throw err; });
});

gulp.task('run', () => {
  ps.exec("love build");
});

async.asyncify()
gulp.task('test', () => {
  async.series([
    // (cb) => gulp.start('clean', cb),
    (cb) => gulp.start('build', cb),
    (cb) => gulp.start('run', cb),
  ], (err) => { if (err) throw err; });
});

gulp.task('default', ['build']);