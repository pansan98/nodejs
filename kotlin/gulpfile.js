const conf = {
	port: 8080,
	https: false,
	server: 'http://kotlin.nodejs.local'
}

const fs = require('fs')
const path = require('path')
const {exec, execSync} = require('child_process')
const {series, parallel, watch, src, dest} = require('gulp')
const browserSync = require('browser-sync').create()
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const changed = require('gulp-changed')
const sass = require('gulp-sass')(require('sass'))
const cleanCSS = require('gulp-clean-css')
const nodemon = require('gulp-nodemon')

const fnapp = (done) => {
	nodemon({
		script: 'server.js',
		ext: 'js',
		watch: [
			'config', 'controller', 'lib', 'model'
		],
		done,
	}).on('restart', () => {
		setTimeout(() => {
			fnbsr(done)
		}, 500)
	})
}

const fnbsr = (done) => {
	browserSync.reload()
	done()
}