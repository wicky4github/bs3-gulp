const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const pump = require('pump');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

// Auto compile src js
gulp.task('js', cb => {
    pump([
            gulp.src('src/bs3.js'),
            uglify({
                mangle: {
                    reserved: ['Result', 'DOM']
                }
            }),
            rename({
                suffix: '.min'
            }),
            gulp.dest('dist')
        ],
        cb
    );
});

// reload browser
gulp.task('html', () => {
    return gulp.src('demo/*.html')
        .pipe(reload({
            stream: true
        }));
});

// start server
gulp.task('serve', ['html', 'js'], () => {
    browserSync({
        server: {
            baseDir: './',
            index: "demo/index.html"
        }
    });

    gulp.watch('src/*.js', ['js', 'html']);
    gulp.watch('demo/*.html',['html']);
});

// default compile
gulp.task('default', ['js']);