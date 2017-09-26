let gulp = require('gulp')
let gutil = require('gulp-util')
// 命令行彩色信息
let uglify = require('gulp-uglify')
// 压缩js
let watchPath = require('gulp-watch-path')
// 监听单个文件
let combiner = require('stream-combiner2')
// 检查js错误
let sourcemaps = require('gulp-sourcemaps')
// 调试
let minifycss = require('gulp-clean-css')
// 压缩css
let less = require('gulp-less')
let autoprefixer = require('gulp-autoprefixer')
// AutoFixer
let imgmin = require('gulp-imagemin')
// 图片压缩
let handlebars = require('gulp-handlebars');
let wrap = require('gulp-wrap');
let declare = require('gulp-declare');
// templates -> html

//调用js文件合并插件
let concat = require('gulp-concat');


let handleError = (err) => {
    let colors = gutil.colors;
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('lineNumber: ' + colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
}

gulp.task('uglifyjs', () => {
    let combined = combiner.obj([
        gulp.src('src/js/**/*.js'),
        sourcemaps.init(),
        uglify(),
        sourcemaps.write('./'),
        gulp.dest('dist/js/')
    ])
    combined.on('error', handleError)
})

gulp.task('watchjs', () => {
  gulp.watch('src/js/**/*.js', (event) => {
    let paths = watchPath(event, 'src', 'dist/')

    gutil.log('JsBg! ' + gutil.colors.green(event.type) + ' ' + paths.srcPath)
    gutil.log('JsEd! ' + paths.distPath)
    let combined = combiner.obj([
        gulp.src(paths.srcPath),
        uglify(),
        gulp.dest(paths.distDir)
    ])
    combined.on('error', handleError)
  })
})

gulp.task('watchcss', () => {
  gulp.watch('src/css/**/*.css', (event)  => {
    let paths = watchPath(event, 'src/', 'dist/')

    gutil.log('CssBg! ' + gutil.colors.green(event.type) + ' ' + paths.srcPath)
    gutil.log('CssEd! ' + paths.distPath)

    gulp.src(paths.srcPath)
        .pipe(sourcemaps.init())
        .pipe(concat('app.css'))
        .pipe(autoprefixer({
          browsers: 'last 2 versions'
        }))
        // AutoFixer
        .pipe(minifycss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.distDir))
    })
})

gulp.task('minifycss', () => {
    gulp.src('src/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(concat('app.css'))
        .pipe(autoprefixer({
          browsers: 'last 2 versions'
        }))
        .pipe(minifycss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css/'))
})

gulp.task('watchless', () => {
  gulp.watch('src/less/**/*.less', (event) => {
    let paths = watchPath(event, 'src/less/', 'dist/css/')

    gutil.log('Less Bg!' + gutil.colors.green(event.type) + ' ' + paths.srcPath)
      gutil.log('Less Ed!' + 'Dist ' + paths.distPath)
      let combined = combiner.obj([
        gulp.src(paths.srcPath),
        sourcemaps.init(),
        autoprefixer({
          browsers: 'last 2 versions'
        }),
        // AutoFixer
        less(),
        minifycss(),
        sourcemaps.write('./'),
        gulp.dest(paths.distDir)
      ])
      combined.on('error', handleError)
    })
})

gulp.task('lesscss', () => {
  let combined = combiner.obj([
    gulp.src('src/less/**/*.less'),
    sourcemaps.init(),
    autoprefixer({
      browsers: 'last 2 versions'
    }),
    // AutoFixer
    less(),
    minifycss(),
    sourcemaps.write('./'),
    gulp.dest('dist/css/')
  ])
  combined.on('error', handleError)
})

gulp.task('watchimg', () => {
  gulp.watch('src/img/**/*', () => {
    let paths = watchPath(event,'src/','dist/')

    gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
    gutil.log('Dist ' + paths.distPath)

    gulp.src(paths.srcPath)
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(paths.distDir))
  })
})

gulp.task('img', () => {
  gulp.src('src/img/**/*')
      .pipe(imgmin({
        progressive: true
      }))
      .pipe(gulp.dest('dist/img'))
})

gulp.task('watchtemplates', () => {
    gulp.watch('src/templates/**/*', (event) => {
        let paths = watchPath(event, 'src/', 'dist/')

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)

        let combined = combiner.obj([
            gulp.src(paths.srcPath),
            handlebars({
              // 3.0.1
              handlebars: require('handlebars')
            }),
            wrap('Handlebars.template(<%= contents %>)'),
            declare({
              namespace: 'S.templates',
              noRedeclare: true
            }),
            gulp.dest(paths.distDir)
        ])
        combined.on('error', handleError)
    })
})

gulp.task('templates', () => {
        gulp.src('src/templates/**/*')
        .pipe(handlebars({
          // 3.0.1
          handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
          namespace: 'S.templates',
          noRedeclare: true
        }))
        .pipe(gulp.dest('dist/templates'))
})


gulp.task('watchcopy', function () {
    gulp.watch('src/fonts/**/*', function (event) {
        var paths = watchPath(event,'src/', 'dist/')

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)

        gulp.src(paths.srcPath)
            .pipe(gulp.dest(paths.distDir))
    })
})

gulp.task('copy', function () {
    gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts/'))
})


gulp.task('default',[
  'uglifyjs','lesscss','img',
  'watchjs','watchless','watchimg'
  ]
)







