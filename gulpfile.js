const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const pump = require('pump');

gulp.task('default', function(cb) {
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