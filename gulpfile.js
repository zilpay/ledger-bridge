// Define required plugins
const { dest, parallel, series, src, watch } = require('gulp');
const path = require('path');
const fs = require('fs-extra');
const sourcemaps = require('gulp-sourcemaps');
const browsersync = require('browser-sync').create();
const nunjucksRender  = require('gulp-nunjucks-render');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');

// Read package.json to use later on
const config = fs.readJsonSync('package.json',  {throws: false });

// Remove the dist folder
function clean() {
  return fs.remove('dist/');
}


// Transpile js
function js(done) {
  const bundler = browserify(config.main, { debug: true }).transform(babel);
  return bundler.bundle()
    .on('error', function(err) { console.error(err.stack); this.emit('end'); })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../../'}))
    .pipe(dest('dist/js/'));
  done();
}
// Optimize JS
function optimizeJS(done) {
  return src('dist/**/*.js')
    .pipe(uglify())
    .pipe(dest('dist/'));
  done();
}

// Transpile html
function html(done) {
  return src([config.globs.html, '!src/layouts/**', '!src/partials/**', '!src/macros/**'])
    .pipe(nunjucksRender({path: 'src'}))
    .pipe(dest('dist/'));
  done();
}

// Copy files
function copyFiles(done) {
  config.filesToCopyGlobs.notImages = '!src/images/**';
  return src(Object.values(config.filesToCopyGlobs))
    .pipe(dest('dist/'));
  done();
}

// BrowserSync local http server
function server(done) {
  browsersync.init({
    server: {baseDir: 'dist/'},
    port: 8080,
    open: true,
    https: true
  });
  done();
}
// BrowserSync live reload
function liveReload(done) {
  browsersync.reload();
  done();
}

// Watch for file changes and run tasks
function watchFiles(done) {
  // Watch js
  watch(config.globs.js, series(js, liveReload));

  // Watch and delete html
  const watchHTML = watch(config.globs.html, series(html, liveReload));
  watchHTML.on('unlink', function (filepath) {
    const filePathFromSrc = path.relative(path.resolve('src'), filepath);
    const destFilePath = path.resolve('dist', filePathFromSrc);
    fs.removeSync(destFilePath);
  });
  done();
}

// Export tasks which can be use later with "gulp taskname"
// Run "gulp --tasks" to see all the avaiable runable tasks
exports.clean = clean;
exports.dev = series(html, parallel(copyFiles, js), server, watchFiles);
exports.build = series(clean, parallel(copyFiles, html, js), parallel(optimizeJS));
exports.buildJS = series(clean, js, optimizeJS);
