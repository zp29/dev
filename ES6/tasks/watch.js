// 监听文件

import gulp from 'gulp'
import gulpif from 'gulp-if'
import gutil from 'gulp-util'

import args from './util/args'

gulp.task('watch', (cb) => {
  if(!args.watch) return cb();

  gulp.watch('app/**/*.js', ['js']);

  gulp.watch('app/**/*.less', ['less']);

  gulp.watch('app/**/*.html', ['html'])

})