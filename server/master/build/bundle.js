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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cluster__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cluster___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_cluster__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_os__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_os___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_os__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dotenv__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dotenv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_dotenv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_express__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_http_proxy__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_http_proxy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_http_proxy__);






__WEBPACK_IMPORTED_MODULE_2_dotenv___default.a.config()

const numCPUs = __WEBPACK_IMPORTED_MODULE_1_os___default.a.cpus().length
const app = __WEBPACK_IMPORTED_MODULE_3_express___default()()
const proxy = __WEBPACK_IMPORTED_MODULE_4_http_proxy___default.a.createProxyServer({})

const addresses = [
    {
        host: '192.168.1.11',
        port: 9001
    },
    {
        host: '192.168.1.11',
        port: 9002
    },
    {
        host: '192.168.1.11',
        port: 9003
    }
]

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

    app.use((req, res) => {
        addresses.forEach(a => {
            proxy.web(req, res, {
                target: `http://${a.host}:${a.port}`
            })
        })
    })
    
    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`)
    })
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("cluster");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("http-proxy");

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map