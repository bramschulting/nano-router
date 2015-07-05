(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["NanoRouter"] = factory();
	else
		root["NanoRouter"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var NanoRouter = (function () {

	  /**
	   * Constructor
	   * @param  {Object} routes Object where key is the route, and value is the callback
	   */

	  function NanoRouter() {
	    var _this = this;

	    var routes = arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, NanoRouter);

	    this._routes = routes;

	    window.addEventListener('hashchange', function () {
	      _this._route();
	    });

	    this._route();
	  }

	  _createClass(NanoRouter, [{
	    key: 'onBeforeRoute',
	    value: function onBeforeRoute(callback) {
	      this._onBeforeRoute = callback;
	    }
	  }, {
	    key: '_route',

	    /**
	     * Handle route change
	     * @param  {String} path Optionally provide a path
	     */
	    value: function _route() {
	      var _this2 = this;

	      var path = arguments[0] === undefined ? this._getCurrentPath() : arguments[0];

	      Object.keys(this._routes).forEach(function (route) {
	        var match = _this2._match(route, path);

	        if (match) {
	          if (typeof _this2._onBeforeRoute === 'function') {
	            _this2._onBeforeRoute(path);
	          }

	          _this2._routes[route].apply(route, match.args);
	        }
	      });
	    }
	  }, {
	    key: '_match',

	    /**
	     * Match a route with a path
	     * @param  {String}       route Route to match
	     * @param  {String}       path  Path to match
	     * @return {bool|Object}        False if no match, an Object with args if match
	     */
	    value: function _match(route, path) {
	      var result = false;
	      var routeParts = route.split('/');
	      var pathParts = path.split('/');

	      var argIndexes = this._getArgIndexes(routeParts);

	      var matchableRoute = this._toMatchableString(routeParts, argIndexes);
	      var matchablePath = this._toMatchableString(pathParts, argIndexes);

	      if (matchableRoute === matchablePath) {
	        result = {
	          args: this._getArgs(pathParts, argIndexes)
	        };
	      }

	      return result;
	    }
	  }, {
	    key: '_getArgIndexes',

	    /**
	     * Get the indexes of the route parts that are placeholders for arguments
	     * @param  {Array}  parts Route parts
	     * @return {Array}        Indexes of the parts that are placeholders for arguments
	     */
	    value: function _getArgIndexes() {
	      var parts = arguments[0] === undefined ? [] : arguments[0];

	      var argIndexes = [];

	      parts.forEach(function (part, index) {
	        if (/:w*/.test(part)) {
	          argIndexes.push(index);
	        }
	      });

	      return argIndexes;
	    }
	  }, {
	    key: '_toMatchableString',

	    /**
	     * Join the parts and replace the arg with a contant, so we can match them later
	     * @param  {Array}  parts      Parts
	     * @param  {Array}  argIndexes Indexes of the parts that should be replaced
	     * @return {String}            Matchable string
	     */
	    value: function _toMatchableString() {
	      var parts = arguments[0] === undefined ? [] : arguments[0];
	      var argIndexes = arguments[1] === undefined ? [] : arguments[1];

	      // Don't modify the original array
	      var _parts = parts.slice(0);

	      _parts.forEach(function (part, index) {
	        if (argIndexes.indexOf(index) !== -1) {
	          _parts[index] = ':placeholder:';
	        }
	      });

	      return _parts.join('/');
	    }
	  }, {
	    key: '_getArgs',

	    /**
	     * Get the args from an array of parts
	     * @param  {Array}  pathParts  Parts
	     * @param  {Array}  argIndexes Indexes of the parts that are arguments
	     * @return {Array}             Arguments
	     */
	    value: function _getArgs() {
	      var pathParts = arguments[0] === undefined ? [] : arguments[0];
	      var argIndexes = arguments[1] === undefined ? [] : arguments[1];

	      var args = [];

	      pathParts.forEach(function (part, index) {
	        if (argIndexes.indexOf(index) !== -1) {
	          args.push(part);
	        }
	      });

	      return args;
	    }
	  }, {
	    key: '_getCurrentPath',

	    /**
	     * Get the current part, with leading slash
	     * @return {[type]} [description]
	     */
	    value: function _getCurrentPath() {
	      // Remove hash and leading /
	      var page = window.location.hash.replace(/^[#]*[\/]*/, '');

	      // Now we add the / again to make sure we only have it once
	      return '/' + page;
	    }
	  }], [{
	    key: 'navigate',

	    /**
	     * Navigate to path
	     * @param  {String} path Path
	     */
	    value: function navigate() {
	      var path = arguments[0] === undefined ? '/' : arguments[0];

	      window.location.hash = (path.substr(0, 1) !== '#' ? '#' : '') + path;
	    }
	  }]);

	  return NanoRouter;
	})();

	exports['default'] = NanoRouter;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;