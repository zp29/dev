
let gulp = require('gulp');
let babel = require('gulp-babel');

gulp.task('js', () => {
  gulp.src('js/app.js')
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(gulp.dest('dist/'))
})

gulp.task('default', ['js']);