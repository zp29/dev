
const ROOT_DIV = 'dist/'
// 服务器根目录
const ROOT_PORT = 2929
// 服务器端口号
const ROOT_STYLE = 'app.less'
// 样式文件  less 


const src = {
// 源文件目录
	root: 'src',
	html: 'src/*.html',
	// html文件
	js: 'src/js/**/*.js',
	// Js文件
	style: 'src/style/' + ROOT_STYLE,
	// style文件
	assets: 'src/assets/**/*.*'
	// 资源目录(字体，图片...)
}


const dist = {
// 开发临时目录
	root: 'dist/',
	html: 'dist/',
	js: 'dist/js',
	style: 'dist/style',
	assets: 'dist/assets'
}

const build = {
// 上线目录
	root: 'build/',
	html: 'build/',
	js: 'build/js',
	style: 'build/style',
	assets: 'build/assets'
}

const lib = {
	normalize : './node_modules/normalize.css/normalize.css',
	bootstrapCss : './node_modules/bootstrap/dist/css/bootstrap.css',
	bootstrapJs : './node_modules/bootstrap/dist/js/bootstrap.js',
	jquery: './node_modules/jquery/dist/jquery.js',
	swiperCss: './node_modules/swiper/dist/css/swiper.css',
	swiperJs: './node_modules/swiper/dist/js/swiper.js',
	FullpageCss: './node_modules/fullpage.js/dist/jquery.fullpage.css',
	FullpageJs: './node_modules/fullpage.js/dist/jquery.fullpage.js'
}

const gulp = require('gulp')
const del = require('del')
const less = require('gulp-less')
const cached = require('gulp-cached')
const autoprefixer = require('gulp-autoprefixer')
const rename = require("gulp-rename")
const gulpSequence  = require('gulp-sequence')


function clean() {
	del([dist.root]).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
	});
	del([build.root]).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
	});
}

gulp.task('clear', () => {
	clean
})

gulp.task('copyStyle', () => {
	gulp.src([
		lib.normalize,
		lib.bootstrapCss,
		lib.swiperCss,
		lib.FullpageCss
	])
			.pipe(rename(function (path) {
				path.extname = ".less"
			}))
			.pipe(gulp.dest('src/style/'))
})
gulp.task('copyScript', () => {
	gulp.src([
		lib.bootstrapJs,
		lib.jquery,
		lib.swiperJs,
		lib.FullpageJs
		])
			.pipe(gulp.dest('src/Js/'))
})


gulp.task('copy',[
	'copyStyle', 'copyScript'
])

gulp.task('html', () => {
	gulp.src(src.html)
			.pipe(gulp.dest(dist.html))
})

gulp.task('style', () => {
	gulp.src(src.style)
			.pipe(cached('style'))
			.pipe(less())
			.pipe(autoprefixer({
        browsers: ['last 3 version']
      }))
      .pipe(gulp.dest(dist.style))
})

gulp.task('js', () => {
	
})

gulp.task('default', function (cb) {
	gulpSequence([
		'clear', 'copy', 'html', 'style'
	])(cb)
})











