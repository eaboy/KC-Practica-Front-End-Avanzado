var gulp = require('gulp'); // importamos gulp
var sass = require('gulp-sass');//importamos gulp-sass
var browserSync = require('browser-sync').create();// importamos browser-sync
var notify = require('gulp-notify');
var gulpImport = require('gulp-html-import');
var tap = require('gulp-tap');
var browserify = require('browserify');
var buffer = require('gulp-buffer');
var sourcemaps = require('gulp-sourcemaps');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var imagemin = require('gulp-imagemin');
var responsive = require('gulp-responsive');

//definimos la tarea por defecto
gulp.task('default', ['html','sass', 'js'], function(){
    // iniciamos el servidor de desarrollo
    browserSync.init({proxy: 'http://127.0.0.1:3100/'});

    // observa cambios en los archivos sass y ejecuta la tarea sass
    gulp.watch(['src/scss/*.scss', 'src/scss/**/*.scss'], ['sass']);

    // observa cambios en los html y recarga el navegador
    gulp.watch(['src/*.html', 'src/**/*.html'], ['html']);

    // observa cambios en los JS y compila el JS de nuevo
    gulp.watch(['src/js/*.js', 'src/js/**/*.js'], ['js']);
});

// compilar sass
gulp.task('sass', function(){
    gulp.src('src/scss/style.scss') // cargamos el archivo style.scss
        .pipe(sourcemaps.init()) // comienza a capturar los soucemaps
        .pipe(sass().on('error', function(error) {
            return notify('Error SASS').write(error);
        })) // lo compilamos con gulp-sacc
        .pipe(postcss([
            autoprefixer(), // transforma el CSS dándole compatibilidad a versiones antiguas
            cssnano() // comprime/minifica el CSS
        ]))
        .pipe(sourcemaps.write('./')) // guarda el sourcemaps en la misma carpeta que el css
        .pipe(gulp.dest('dist/')) // guardamos el resultado en la carpeta css
        .pipe(browserSync.stream()); // recarga el css al vuelo
});

// copiar e importar html
gulp.task('html', function(){
    gulp.src('src/*.html')
        .pipe(gulpImport('src/components/')) // reemplaza los @import de los html
        .pipe(htmlmin({collapseWhitespace: true})) // minifica el html
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

// compilar y generar un único javascript
gulp.task('js', function(){
    gulp.src('src/js/main.js')
        .pipe(tap(function(file){// tap nos permite ejecutar una función por cada fichero seleccionado en gulp.src
            // reemplazamos el contenido del fichero por lo que nos devuelve browserify pasándole el fichero
            file.contents = browserify(file.path, {debug: true}) // creamos una instancia de browserify en base al archivo
                .transform('babelify', {presets: ['es2015']}) // traduce nuestro código de ES6 a ES5
                .bundle() // compilamos el archivo
                .on('error', function(error){
                    return notify('Error JS').write(error);
                });
        }))
            .pipe(buffer()) // convertimos a buffer para que funcione el siguiente pipe
            .pipe(sourcemaps.init({loadMaps: true})) // captura los sourcemaps del archivo fuente
            .pipe(uglify()) // minificamos el JS
            .pipe(sourcemaps.write('./')) // guarda los sourcemaps en el mismo directorio que el archivo fuente
            .pipe(gulp.dest("dist/")) // lo guardamos en la carpeta dist
            .pipe(browserSync.stream()); // recargamos el navegador
});

// Tarea que optimiza y crea las imágenes responsive

gulp.task('img', function(){
    gulp.src('src/img/*')
        .pipe(responsive({ // Crea las imágenes en los distintos tamaños.
            '*' : [
                { width: 150, rename: { suffix: '150px' }},
                { width: 250, rename: { suffix: '250px' }},
                { width: 300, rename: { suffix: '300px' }}
            ]
        }))
        .pipe(imagemin()) // Optimiza las imágenes
        .pipe(gulp.dest('dist/img'));
});