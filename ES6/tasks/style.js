// 处理 less

import gulp from 'gulp'
import gulpif from 'gulp-if'

import less from 'gulp-less'
import cssmin from 'gulp-clean-css';

import args from './util/args'

import browserSync from 'browser-sync'
const reload = browserSync.create().reload;

gulp.task('less', () => {
  gulp.src('app/css/app.less')
      .pipe(less())
      .pipe(cssmin())
      .pipe(gulp.dest('dist/css'))
      .pipe(reload({stream: true}))
      // .pipe(gulpif(args.watch, livereload()))
})



