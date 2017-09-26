// 启动 gulp

import gulp from 'gulp'
import gulpSequence from 'gulp-sequence'

gulp.task('build', gulpSequence(

  'less', 'js', 'html',

  ['watch','server']

))