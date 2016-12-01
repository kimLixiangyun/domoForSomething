/**
 * Created by ASUS on 2016/12/1.
 */

var gulp=require('gulp'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    cssmin = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    fileInclude = require('gulp-file-include');

//1.从src文件夹复制文件到dist文件夹去;
gulp.task('copy',function(){
    gulp.src('src/html/*.html')//任务针对文件
        .pipe(gulp.dest('dist/html'))//操作后的目标文件
});
//执行命令 gulp copy
gulp.task('zyl', ['webserver','watcher','livereload']);
//2.使用gulp-less插件将less文件编译成css，当有less文件发生改变自动编译less，
// 并保证less语法错误或出现异常时能正常工作并提示错误信息。
gulp.task('testLess', function () {
    gulp.src('src/less/index.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});
//执行命令 gulp testLess

//3.使用gulp-uglify压缩javascript文件，减小文件大小。
gulp.task('jsmin', function () {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
//执行命令 gulp jsmin

//4.使用gulp-concat合并javascript文件，减少网络请求。合并js文件
gulp.task('testConcat', function () {
    gulp.src('src/js/*.js')
        .pipe(concat('all.js'))//合并后的文件名
        .pipe(gulp.dest('dist/js'));
});
//执行命令 gulp testConcat

//5.使用gulp-htmlmin压缩html，可以压缩页面javascript、css，去除页面空格、注释，删除多余属性等操作。
//gulp.task('testHtmlmin', function () {
//    var options = {
//        removeComments: true,//清除HTML注释
//        collapseWhitespace: true,//压缩HTML
//        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
//        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
//        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
//        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
//        minifyJS: true,//压缩页面JS
//        minifyCSS: true//压缩页面CSS
//    };
//    gulp.src('src/html/*.html')
//        .pipe(htmlmin(options))
//        .pipe(gulp.dest('dist/html'));
//});
//执行命令 gulp testHtmlmin

//6.删除模块中的文件
gulp.task('del',function(){
    del(['src/css/*.js'])
});
//执行命令 gulp del

//7.使用gulp-autoprefixer根据设置浏览器版本自动处理浏览器前缀。
gulp.task('testAutoFx', function () {
    gulp.src('src/css/new.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('dist/css'));
});
//执行命令 gulp testAutoFx

//8.使用gulp-imagemin压缩图片文件（包括PNG、JPEG、GIF和SVG图片）
gulp.task('testImagemin',function(){
    gulp.src('src/images/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/images'));
})
//执行命令 gulp testImagemin

//9.文件重命名gulp-rename
gulp.task('testRename',function(){
    gulp.src('src/html/new1.html')
        .pipe(rename('/html/new2.html'))
        .pipe(gulp.dest('dist/html'));
})
//执行命令 gulp testRename

//10.gulp-minify-css压缩css
gulp.task('testCssmin', function () {
    gulp.src('src/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});
//执行命令 gulp testCssmin


//5.实时刷新;
gulp.task('livereload',function(){
    gulp.src('src/html/*.html')//任务针对文件
        .pipe(gulp.dest('dist/html'))//操作后的目标文件
        .pipe(connect.reload())
});
//3.监视文件夹src的文件是否改动,如果改动复制到dist文件夹去;
gulp.task('watcher',function(){
    gulp.watch('src/html/work.html',['livereload'])
})

//4.利用gulp搭建简单服务器;
gulp.task('webserver',function() {
    connect.server({
        livereload: true,
        port: 8878
    });
});
//执行命令 gulp webserver


//5.实时刷新;npm install gulp gulp-livereload --save-dev
gulp.task('testLivereload', function () {    // 这里的watch，是自定义的，写成live或者别的也行
    gulp.src('src/**/ *.*')
        .pipe(livereload())
});
gulp.task('watch_livereload',function(){
    livereload.listen();
    gulp.watch('src/**/*.*',['testLivereload'])
});
//执行命令 gulp watch_livereload


//8.合并css文件
gulp.task('concatCss',function(){
    gulp.src('src/css/*.css')
        .pipe(concat('all.css'))//合并后的文件名
        .pipe(gulp.dest('dist/css'));
})
//执行命令 gulp concatCss

//13.模块合并;gulp-load-plugins
//var gulp=require('gulp'),
//    gulpLoadPlugins=require('gulp-load-plugins'),
//    plugins=gulpLoadPlugins();
//gulp.task('js',function(){
//    return gulp.src('src/js/*.js')
//        .pipe(plugins.uglify())
//        .pipe(plugins.concat('app.js'))
//        .pipe(gulp.dest('src/js'));
//})

//15.自动添加公共部分gulp-file-include
gulp.task('fileinclude', function() {
    gulp.src('src/html/concat.html')
        .pipe(fileInclude({
            basepath:"@file",
            prefix:"@@"
        }))
        .pipe(gulp.dest('dist/html'));
});

