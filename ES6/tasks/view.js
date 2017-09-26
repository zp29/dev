// 处理 html

import gulp from 'gulp'
import gulpif from 'gulp-if'

import args from './util/args'

import browserSync from 'browser-sync'
const reload = browserSync.create().reload;

gulp.task('html', () => {
  gulp.src('app/index.html')
      .pipe(gulp.dest('dist/'))
      .pipe(reload({stream: true}))
      // .pipe(gulpif(args.watch, livereload()))
})