
// 处理js

import gulp from 'gulp'

import gulpif from 'gulp-if'
import args from './util/args'
import gutil from 'gulp-util'

import webpack from 'webpack'
import gulpwebpack from 'webpack-stream'
import named from 'vinyl-named';

import browserSync from 'browser-sync'
const reload = browserSync.create().reload;

import plumber from 'gulp-plumber'
import { log, colors } from 'gulp-util'


let webpackconfig = require("../webpack.config")

gulp.task('js', () => {
  gulp.src(['app/js/app.js'])
      .pipe(plumber())
      .pipe(named())
      .pipe(gulpwebpack(webpackconfig),(err,stats) => {
        if ( err ) throw new gutil.PluginError("webpack",err);
        log(`Fininshed '${colors.cyan('js')}'`,stats.toSting({ chunks: false }))
      })
      .pipe(gulp.dest('dist/js'))
      .pipe(reload({stream: true}))
})
