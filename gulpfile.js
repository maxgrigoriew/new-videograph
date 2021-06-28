 
// Определяем константы Gulp
const { src, dest, parallel, series, watch } = require('gulp');
 
// Подключаем Browsersync
const browserSync = require('browser-sync').create();
 
// Подключаем gulp-concat
const concat = require('gulp-concat');
 
// Подключаем gulp-uglify-es
const uglify = require('gulp-uglify')
 
// Подключаем модули gulp-sass и gulp-less
const scss = require('gulp-sass');
 
// Подключаем Autoprefixer
const autoprefixer = require('gulp-autoprefixer');

// Подключаем minimg
const imagemin = require('gulp-imagemin');


 
 
// Определяем логику работы Browsersync
function browsersync() {
	browserSync.init({ // Инициализация Browsersync
		server: { baseDir: 'app/' }, // Указываем папку сервера
		notify: false,
		browser: 'firefox', // Отключаем уведомления
		online: false // Режим работы: true или false
		//  browser: 'chrome'
	})
}
 
function scripts() {
	return src([ // Берём файлы из источников
		'node_modules/jquery/dist/jquery.js',
		'node_modules/mixitup/dist/mixitup.js',
		'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
		'app/js/main.js'
		// Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
		])
	.pipe(concat('main.min.js')) // Конкатенируем в один файл
	.pipe(uglify()) // Сжимаем JavaScript
	.pipe(dest('dist/js/')) // Выгружаем готовый файл в папку назначения
	.pipe(browserSync.stream()) // Триггерим Browsersync для обновления страницы
}
 
function styles() {
       return src(
        [
            'app/scss/style.scss'
        ]        
        )
	.pipe(concat('style.min.css')) // Конкатенируем в файл app.min.js
	// .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
    .pipe(scss({ outputStyle: 'compressed' }))
	.pipe(dest('app/css/')) // Выгрузим результат в папку "app/css/"
	.pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}

// function images() {
// 	return src('app/images/**/*.*')
// 		.pipe(imagemin())
// 	.pipe(dest('dist/images'))
// }


 
function images() {
	return src('app/images/**/*.*')
		.pipe(imagemin([
			    imagemin.gifsicle({interlaced: true}),
				imagemin.mozjpeg({quality: 75, progressive: true}),
				imagemin.optipng({optimizationLevel: 5}),
				imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
		]))
		.pipe(dest('dist/images'))
}
 
function startwatch() {
 
	// Выбираем все файлы JS в проекте, а затем исключим с суффиксом .min.js
	watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
	
	// Мониторим файлы препроцессора на изменения
	watch('app/scss/**/*.scss', styles);
 
	// Мониторим файлы HTML на изменения
	watch('app/**/*.html').on('change', browserSync.reload);
 
}
function build() {
	return src([
		'app/**/*.html',
		'app/css/style.min.css',
		'app/js/main.min.js',
	])
	.pipe(dest('dist'))
}
 
// Экспортируем функцию browsersync() как таск browsersync. Значение после знака = это имеющаяся функция.
exports.browsersync = browsersync;
 
// Экспортируем функцию scripts() в таск scripts
exports.scripts = scripts;
 
// Экспортируем функцию styles() в таск styles
exports.styles = styles;

// Экспортируем картинки 
exports.images = images;

exports.build = build;

exports.startwatch = startwatch;
 
 
// Экспортируем дефолтный таск с нужным набором функций
exports.default = parallel(styles, scripts, browsersync, startwatch);
