require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cluster__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cluster___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_cluster__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_os__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_os___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_os__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dotenv__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dotenv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_dotenv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_express__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_cors__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_cors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_morgan__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_morgan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_morgan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_path__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_consolidate__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_consolidate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_consolidate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__tools__ = __webpack_require__(11);










__WEBPACK_IMPORTED_MODULE_2_dotenv___default.a.config()

const numCPUs = __WEBPACK_IMPORTED_MODULE_1_os___default.a.cpus().length
const app = __WEBPACK_IMPORTED_MODULE_3_express___default()()
app.use([
    __WEBPACK_IMPORTED_MODULE_5_morgan___default()('dev'),
    __WEBPACK_IMPORTED_MODULE_4_cors___default()()
])

app.use((req, res, next) => {
    res.render = (file, params) => {
        let filePath = __WEBPACK_IMPORTED_MODULE_6_path___default.a.resolve(__dirname, '../client', file)
        
        __WEBPACK_IMPORTED_MODULE_7_consolidate___default.a.mustache(filePath, params || {}, (error, html) => {
            if (error) return next(error)

            res.set('Content-Type', 'text/html')
            res.status(200).send(html)
        })
    }

    next()
})

if (__WEBPACK_IMPORTED_MODULE_0_cluster___default.a.isMaster) {
    console.log(`Master ${process.pid} is running`)

    for (let i = 0; i < numCPUs; i++) {
        __WEBPACK_IMPORTED_MODULE_0_cluster___default.a.fork()
    }

    __WEBPACK_IMPORTED_MODULE_0_cluster___default.a.on('exit', (worker, code, signal) => {
        console.log(`worker %d died (%s). restarting...`, worker.process.pid, signal || code)

        __WEBPACK_IMPORTED_MODULE_0_cluster___default.a.fork()
    })
} else {
    console.log(`Worker ${process.pid} is running`)

    const args = process.argv.splice(2)
    const port = args[0] || process.env.PORT

    app.get('/', (req, res) => {
        res.render('index.html')
    })

    app.get('/search', (req, res) => {
        let q = req.param('q')
    
        return Object(__WEBPACK_IMPORTED_MODULE_8__tools__["b" /* search */])(q.replace(/ /g, '+'), res)
    })
    
    app.get('/download', (req, res) => {
        let link = req.param('link')
    
        if (link.indexOf('_download.html') === -1) link = link.replace('.html', '_download.html')
        
        return Object(__WEBPACK_IMPORTED_MODULE_8__tools__["a" /* download */])(link, res)
    })
    
    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`)
    })
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "/"))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("cluster");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("consolidate");

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__search__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__download__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__search__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__download__["a"]; });





/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cheerio__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cheerio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_cheerio__);



const BASE_URL = 'http://search.chiasenhac.vn/search.php?s='

let search = async (s, res) => {
    try {
        let _r = await __WEBPACK_IMPORTED_MODULE_0_axios___default()({
            url: BASE_URL + s,
            method: 'get'
        })
        let formData = []
        let $ = __WEBPACK_IMPORTED_MODULE_1_cheerio___default.a.load(_r.data)
    
        $('.tbtable tbody tr').each((i, elem) => {
            let title = $(elem).find('.tenbh p .musictitle').text()
            let artist = $(elem).find('.tenbh p').text()
                            .replace(/\t/g, '')
                            .replace(/\n/g, '')
                            .replace(title, '')
            let url = $(elem).find('.tenbh p .musictitle').attr('href')
            let duration = $(elem).find('.gen').text()
    
            if (title) {
                formData.push({
                    title,
                    artist,
                    url,
                    duration: duration.substring(0, duration.indexOf(':') + 3),
                    quality: duration.substring(duration.indexOf(':') + 3, duration.length)
                })
            }
        })

        return res.status(200).send(formData)
    } catch (_e) {
        return res.status(200).send(_e)
    }
}

/* harmony default export */ __webpack_exports__["a"] = (search);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cheerio__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cheerio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_cheerio__);



let download = async (url, res) => {
    if (!url) return res.status(400).send(`${res.statusCode}: Bad Request.`)

    try {
        let _r = await __WEBPACK_IMPORTED_MODULE_0_axios___default()({
            url,
            method: 'GET'
        })

        let array_download = []
        let $ = __WEBPACK_IMPORTED_MODULE_1_cheerio___default.a.load(_r.data)
        
        $('#downloadlink2 b a').each((i, elem) => {
            let link = $(elem).attr('href')
            let arr = link.split(' ')

            array_download.push({
                link: link.replace(/ /g, '%20'),
                label: arr[1].substring(0, arr[1].indexOf('.')).replace(/\[/g, '').replace(/\]/g, '')
            })
        })

        return res.status(200).send(array_download)
    } catch (_e) {
        return res.status(200).send(_e)
    }
}

/* harmony default export */ __webpack_exports__["a"] = (download);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map