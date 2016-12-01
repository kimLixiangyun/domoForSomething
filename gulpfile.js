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

//1.��src�ļ��и����ļ���dist�ļ���ȥ;
gulp.task('copy',function(){
    gulp.src('src/html/*.html')//��������ļ�
        .pipe(gulp.dest('dist/html'))//�������Ŀ���ļ�
});
//ִ������ gulp copy
gulp.task('zyl', ['webserver','watcher','livereload']);
//2.ʹ��gulp-less�����less�ļ������css������less�ļ������ı��Զ�����less��
// ����֤less�﷨���������쳣ʱ��������������ʾ������Ϣ��
gulp.task('testLess', function () {
    gulp.src('src/less/index.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});
//ִ������ gulp testLess

//3.ʹ��gulp-uglifyѹ��javascript�ļ�����С�ļ���С��
gulp.task('jsmin', function () {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
//ִ������ gulp jsmin

//4.ʹ��gulp-concat�ϲ�javascript�ļ��������������󡣺ϲ�js�ļ�
gulp.task('testConcat', function () {
    gulp.src('src/js/*.js')
        .pipe(concat('all.js'))//�ϲ�����ļ���
        .pipe(gulp.dest('dist/js'));
});
//ִ������ gulp testConcat

//5.ʹ��gulp-htmlminѹ��html������ѹ��ҳ��javascript��css��ȥ��ҳ��ո�ע�ͣ�ɾ���������ԵȲ�����
//gulp.task('testHtmlmin', function () {
//    var options = {
//        removeComments: true,//���HTMLע��
//        collapseWhitespace: true,//ѹ��HTML
//        collapseBooleanAttributes: true,//ʡ�Բ������Ե�ֵ <input checked="true"/> ==> <input />
//        removeEmptyAttributes: true,//ɾ�����пո�������ֵ <input id="" /> ==> <input />
//        removeScriptTypeAttributes: true,//ɾ��<script>��type="text/javascript"
//        removeStyleLinkTypeAttributes: true,//ɾ��<style>��<link>��type="text/css"
//        minifyJS: true,//ѹ��ҳ��JS
//        minifyCSS: true//ѹ��ҳ��CSS
//    };
//    gulp.src('src/html/*.html')
//        .pipe(htmlmin(options))
//        .pipe(gulp.dest('dist/html'));
//});
//ִ������ gulp testHtmlmin

//6.ɾ��ģ���е��ļ�
gulp.task('del',function(){
    del(['src/css/*.js'])
});
//ִ������ gulp del

//7.ʹ��gulp-autoprefixer��������������汾�Զ����������ǰ׺��
gulp.task('testAutoFx', function () {
    gulp.src('src/css/new.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //�Ƿ���������ֵ Ĭ�ϣ�true ��������
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //�Ƿ�ȥ������Ҫ��ǰ׺ Ĭ�ϣ�true
        }))
        .pipe(gulp.dest('dist/css'));
});
//ִ������ gulp testAutoFx

//8.ʹ��gulp-imageminѹ��ͼƬ�ļ�������PNG��JPEG��GIF��SVGͼƬ��
gulp.task('testImagemin',function(){
    gulp.src('src/images/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //���ͣ�Number  Ĭ�ϣ�3  ȡֵ��Χ��0-7���Ż��ȼ���
            progressive: true, //���ͣ�Boolean Ĭ�ϣ�false ����ѹ��jpgͼƬ
            interlaced: true, //���ͣ�Boolean Ĭ�ϣ�false ����ɨ��gif������Ⱦ
            multipass: true //���ͣ�Boolean Ĭ�ϣ�false ����Ż�svgֱ����ȫ�Ż�
        }))
        .pipe(gulp.dest('dist/images'));
})
//ִ������ gulp testImagemin

//9.�ļ�������gulp-rename
gulp.task('testRename',function(){
    gulp.src('src/html/new1.html')
        .pipe(rename('/html/new2.html'))
        .pipe(gulp.dest('dist/html'));
})
//ִ������ gulp testRename

//10.gulp-minify-cssѹ��css
gulp.task('testCssmin', function () {
    gulp.src('src/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});
//ִ������ gulp testCssmin


//5.ʵʱˢ��;
gulp.task('livereload',function(){
    gulp.src('src/html/*.html')//��������ļ�
        .pipe(gulp.dest('dist/html'))//�������Ŀ���ļ�
        .pipe(connect.reload())
});
//3.�����ļ���src���ļ��Ƿ�Ķ�,����Ķ����Ƶ�dist�ļ���ȥ;
gulp.task('watcher',function(){
    gulp.watch('src/html/work.html',['livereload'])
})

//4.����gulp��򵥷�����;
gulp.task('webserver',function() {
    connect.server({
        livereload: true,
        port: 8878
    });
});
//ִ������ gulp webserver


//5.ʵʱˢ��;npm install gulp gulp-livereload --save-dev
gulp.task('testLivereload', function () {    // �����watch�����Զ���ģ�д��live���߱��Ҳ��
    gulp.src('src/**/ *.*')
        .pipe(livereload())
});
gulp.task('watch_livereload',function(){
    livereload.listen();
    gulp.watch('src/**/*.*',['testLivereload'])
});
//ִ������ gulp watch_livereload


//8.�ϲ�css�ļ�
gulp.task('concatCss',function(){
    gulp.src('src/css/*.css')
        .pipe(concat('all.css'))//�ϲ�����ļ���
        .pipe(gulp.dest('dist/css'));
})
//ִ������ gulp concatCss

//13.ģ��ϲ�;gulp-load-plugins
//var gulp=require('gulp'),
//    gulpLoadPlugins=require('gulp-load-plugins'),
//    plugins=gulpLoadPlugins();
//gulp.task('js',function(){
//    return gulp.src('src/js/*.js')
//        .pipe(plugins.uglify())
//        .pipe(plugins.concat('app.js'))
//        .pipe(gulp.dest('src/js'));
//})

//15.�Զ���ӹ�������gulp-file-include
gulp.task('fileinclude', function() {
    gulp.src('src/html/concat.html')
        .pipe(fileInclude({
            basepath:"@file",
            prefix:"@@"
        }))
        .pipe(gulp.dest('dist/html'));
});

