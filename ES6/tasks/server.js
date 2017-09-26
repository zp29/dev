// 配置服务器

import gulp from 'gulp'
import gulpif from 'gulp-if'
import gutil from 'gulp-util'

import args from './util/args'

import webpack from 'webpack'
import webpackconfig from '../webpack.config.js'

import browserSync from 'browser-sync'
const server = browserSync.create();
const reload = server.reload;


gulp.task('server', () => {
  server.init({
    server: 'dist/'
  });
  gulp.watch('app/**/*.*',['build'])
  gulp.watch('app/**/*.*',reload)
})


// gulp.task("server", function(callback) {

//   var compiler = webpack(webpackconfig);

  // new WebpackDevServer(compiler, {
  //   open : true,
  //   hot: true,
  //   historyApiFallback: true,
  //   contentBase: './dist',
  //   open: true,
  //   inline: true
  // }).listen(2929, "localhost", function(err) {
  //     if(err) throw new gutil.PluginError("webpack-dev-server", err);
  //     // Server listening
  //     gutil.log("[webpack-dev-server]", "http://localhost:2929");

  //     // keep the server alive or continue?
  //     // callback();
  // });

// });