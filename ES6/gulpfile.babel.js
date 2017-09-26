// 入口 默认任务

import gulp from 'gulp'
import requireDir from 'require-dir'

requireDir('./tasks')

gulp.task('default', ['build'])