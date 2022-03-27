const gulp = require("gulp");
const minifyCss = require("gulp-minify-css");
const scss = require("gulp-sass")(require('sass'));
const rename = require("gulp-rename");
const connect = require("gulp-connect");
const clean = require('gulp-clean');


gulp.task("scss", function () {
  return gulp.src("stylesheet/index.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})
// //把less文件=>css文件=>压缩=>min.css


// //批量处理
gulp.task("scssAll", function () {
  return gulp.src("stylesheet/*.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})



// //批量处理js
gulp.task("scripts", function () {
  return gulp.src("*.js", "!gulpfile.js")
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload())
})

// //批量处理html
gulp.task("copy-html", function () {
  return gulp.src("*.html")
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload())
})

// //批量处理数据
gulp.task("data", function () {
  return gulp.src("*.json", "!package.json")
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload())
})

// //批量处理图片
gulp.task("images", function () {
  return gulp.src("images/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload())
})


// // 一次性执行多个任务
gulp.task("build", gulp.parallel("scss", "scssAll", "scripts", "copy-html", "data", "images", function () {
  console.log("项目建立成功")
}))


//监听
gulp.task("watchs", function () {
  gulp.watch("stylesheet/index.scss", gulp.series('scss'))
  gulp.watch("stylesheet/*.scss", gulp.series('scssAll'))
  gulp.watch(["*.js", "!gulpfile.js"], gulp.series('scripts'))
  gulp.watch("*.html", gulp.series('copy-html'))
  gulp.watch(["*.json", "!package.json"], gulp.series('data'))
  gulp.watch("images/**/*", gulp.series('images'))
})

// //启动一个服务器 gulp-connect
gulp.task('connect:app', function () {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 9963
  })
})

gulp.task('connect:dist', function (cb) {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 9999
  })
  cb();
})

gulp.task('clean:app', function () {
  return gulp.src('dist', { read: false })
    .pipe(clean());
})

gulp.task('default', gulp.series(gulp.parallel("scss", "scssAll", "scripts", "copy-html", "data", "images")))

gulp.task('init', gulp.series('clean:app', gulp.parallel("scss", "scssAll", "scripts", "copy-html", "data", "images")))

gulp.task('dev', gulp.series('init', 'connect:app', 'watchs'))

gulp.task('build', gulp.series('init'))

gulp.task('server', gulp.series('connect:dist', 'build', 'watchs'))