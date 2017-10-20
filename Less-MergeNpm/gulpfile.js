
let src__DIR__ = 'src/'
// 源文件目录
let dist__DIR__ = 'dist/'
// 生成文件目录


let gulp = require('gulp')
let cssauto = require('gulp-autoprefixer')
let cssmin = require('gulp-clean-css')
let less = require('gulp-less')
// css处理
let useref = require('gulp-useref')
// HTML自动注入
let plumber = require('gulp-plumber')
let named = require('vinyl-named')
let gulpwebpack =require('webpack-stream')
let webpackconfig = require('./webpack.config.js')
// js打包
let args = require('yargs')
let gulpif = require('gulp-if')
let gutil = require('gulp-util')
// 命令行处理
let connect = require('gulp-connect')
// 服务器

args.option('watch',{
  boolean:true,
  default:false,
  describe:'watch all files'
})
let cmd = args.argv

gulp.task('server', (cb)=>{
	if(!cmd.watch) return cb();
	connect.server({
		root:dist__DIR__,
		livereload: true
	})
})

gulp.task('html', () => {
	gulp.src(src__DIR__+'/*.html')
			.pipe(useref())
      .pipe(gulpif('*.less', less()))
      .pipe(gulpif('*.css', cssmin()))
      .pipe(gulpif('*.css', cssauto()))
			.pipe(gulp.dest(dist__DIR__))
			.pipe(gulpif(cmd.watch, connect.reload()))
})
gulp.task('watch', (cb) => {
	if(!cmd.watch) return cb();
	gulp.watch(src__DIR__+'/**/*.html', ['html']);
	gulp.watch(src__DIR__+'/**/*.js', ['js']);
})

gulp.task('js', () => {
	gulp.src('src/js/app.js')
			.pipe(plumber())
			.pipe(named())
			.pipe(gulpwebpack(webpackconfig),(err,stats) => {
        if ( err ) throw new gutil.PluginError("webpack",err);
        log(`Fininshed '${colors.cyan('js')}'`,stats.toSting({ chunks: false }))
      })
      .pipe(gulp.dest(dist__DIR__+'js'))
      .pipe(gulpif(cmd.watch, connect.reload()))
})

gulp.task('default',[
	'server', 'html', 'js',
	'watch'
])












