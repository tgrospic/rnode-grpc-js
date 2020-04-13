"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.bind");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.downloadAll = exports.downLoadFile = void 0;

require("regenerator-runtime/runtime");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _request = _interopRequireDefault(require("request"));

var R = _interopRequireWildcard(require("ramda"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _console = console,
    log = _console.log,
    error = _console.error;

var downLoadFile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(opt) {
    var downloadUrl, filePath, file, cleanUp;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            downloadUrl = opt.downloadUrl, filePath = opt.filePath;
            file = _fsExtra["default"].createWriteStream(filePath);

            cleanUp = function cleanUp() {
              file.close();
              return _fsExtra["default"].remove(filePath);
            };

            log('Downloading', downloadUrl);
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              _request["default"].get(downloadUrl).on('response', function (res) {
                if (res.statusCode !== 200) {
                  cleanUp();
                  reject(Error("File not found: ".concat(downloadUrl)));
                }
              }).on('error', reject).pipe(file);

              file.on('finish', function () {
                file.close();
                resolve(opt);
              });
              file.on('error', function (err) {
                cleanUp();
                reject(err);
              });
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function downLoadFile(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.downLoadFile = downLoadFile;
var downloadAll = R.pipe(R.map(downLoadFile), Promise.all.bind(Promise));
exports.downloadAll = downloadAll;

var fetch = function fetch(opt) {
  return new Promise(function (resolve, reject) {
    (0, _request["default"])(opt, function (err, res, body) {
      var isJson = !!opt.json;
      if (err) reject(err);else if (res.statusCode !== 200) reject(Error("HTTP ".concat(res.statusCode)));else resolve(isJson ? body : res);
    });
  });
};

exports.fetch = fetch;