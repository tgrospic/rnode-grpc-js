"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = void 0;

require("regenerator-runtime/runtime");

var _path = _interopRequireDefault(require("path"));

var _child_process = require("child_process");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var R = _interopRequireWildcard(require("ramda"));

var _args4 = require("./args");

var _download = require("./download");

var _typings = require("./typings");

var _lib = require("../lib");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Relative location of directories where protobuf files are located
// in RChain main repository https://github.com/rchain/rchain
var rchainProtoDirs = ['models/src/main/protobuf', 'node/src/main/protobuf'];
var _console = console,
    log = _console.log,
    error = _console.error;

var blue = function blue(txt) {
  return "\x1B[34m".concat(txt, "\x1B[0m");
};

var ext = process.platform === 'win32' ? '.cmd' : ''; // Resolve npm bin folder in the top project
// <project>/node_modules/@tgrospic/rnode-grpc-js/dist/cli

var npmBin = _path["default"].resolve(__dirname, '../../../../.bin');

var generateJsPb = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var jsPath, protoPath, protoFiles, protoc, args, protocExe;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            jsPath = _ref.jsPath, protoPath = _ref.protoPath, protoFiles = _ref.protoFiles;
            protoc = _path["default"].resolve(npmBin, "grpc_tools_node_protoc".concat(ext));
            args = ["--js_out=import_style=commonjs:".concat(jsPath), "-I".concat(protoPath)].concat(_toConsumableArray(protoFiles));
            protocExe = (0, _child_process.spawn)(protoc, args, {
              stdio: 'inherit'
            });
            return _context.abrupt("return", (0, _lib.waitExit)(protocExe, null, "Failed to generate JS files with grpc-tools."));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function generateJsPb(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var generateJsonPb = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
    var jsPath, protoFiles, pbjs, jsonPath, args, pbExe;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            jsPath = _ref3.jsPath, protoFiles = _ref3.protoFiles;
            pbjs = _path["default"].resolve(npmBin, "pbjs".concat(ext));
            jsonPath = "".concat(jsPath, "/pbjs_generated.json");
            args = ["-t", "json", "-o", jsonPath, '--keep-case'].concat(_toConsumableArray(protoFiles));
            pbExe = (0, _child_process.spawn)(pbjs, args, {
              stdio: 'inherit'
            });
            return _context2.abrupt("return", (0, _lib.waitExit)(pbExe, jsonPath, "Failed to generate JSON schema with pbjs."));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function generateJsonPb(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

var run = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref5) {
    var args, cwd, options, _options$rnodeVersio, version, _options$genDir, genDirRel, _options$includeRefl, includeReflection, dirPath, protoPath, scalapbPath, jsPath, githubListFilesUrl, fetchProtoListFromGithub, protoDownload, scalapbDownload, reflectionDownload, protoDownloads, newDirs, protoFiles, jsonPath, protoSchema;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            args = _ref5.args, cwd = _ref5.cwd;
            // Input options
            options = (0, _args4.parseArgs)(args);
            _options$rnodeVersio = options['rnode-version'], version = _options$rnodeVersio === void 0 ? 'v0.9.12' : _options$rnodeVersio, _options$genDir = options['gen-dir'], genDirRel = _options$genDir === void 0 ? 'rnode-grpc-gen' : _options$genDir, _options$includeRefl = options['include-reflection'], includeReflection = _options$includeRefl === void 0 ? false : _options$includeRefl;
            log(blue('RNode gRPC versions'), {
              'rnode-version': version
            }); // Directory paths

            dirPath = _path["default"].resolve(cwd, genDirRel);
            protoPath = _path["default"].resolve(dirPath, 'proto');
            scalapbPath = _path["default"].resolve(protoPath, 'scalapb');
            jsPath = _path["default"].resolve(dirPath, 'js'); // Get proto files with Github API

            githubListFilesUrl = function githubListFilesUrl(dir) {
              return "https://api.github.com/repos/rchain/rchain/contents/".concat(dir, "?ref=").concat(version);
            };

            fetchProtoListFromGithub = function fetchProtoListFromGithub(dir) {
              return (0, _download.fetch)({
                url: githubListFilesUrl(dir),
                headers: {
                  'User-Agent': 'rnode-grpc-js generator for RChain RNode API'
                },
                json: true
              });
            }; // Proto files download params


            protoDownload = function protoDownload(_ref7) {
              var name = _ref7.name,
                  download_url = _ref7.download_url;
              return {
                downloadUrl: download_url,
                filePath: _path["default"].resolve(protoPath, name)
              };
            }; // Additional proto file not in RChain repo


            scalapbDownload = {
              downloadUrl: 'https://raw.githubusercontent.com/scalapb/ScalaPB/master/protobuf/scalapb/scalapb.proto',
              filePath: _path["default"].resolve(scalapbPath, 'scalapb.proto')
            };
            reflectionDownload = {
              downloadUrl: 'https://raw.githubusercontent.com/grpc/grpc/v1.24.1/src/proto/grpc/reflection/v1alpha/reflection.proto',
              filePath: _path["default"].resolve(protoPath, 'reflection.proto')
            }; // Fetch info of all proto files

            _context3.next = 15;
            return R.pipe((0, _lib.chainAsync)(fetchProtoListFromGithub), (0, _lib.filterAsync)(function (_ref8) {
              var name = _ref8.name;
              return name !== 'routing.proto';
            }), (0, _lib.mapAsync)(protoDownload), (0, _lib.then)(R.append(scalapbDownload)), (0, _lib.then)(includeReflection ? R.append(reflectionDownload) : R.identity))(rchainProtoDirs);

          case 15:
            protoDownloads = _context3.sent;
            // Cleanup existing files and ensure directory structure
            newDirs = [protoPath, scalapbPath, jsPath];
            _context3.next = 19;
            return _fsExtra["default"].remove(dirPath);

          case 19:
            _context3.next = 21;
            return (0, _lib.mapAsync)(_fsExtra["default"].ensureDir, newDirs);

          case 21:
            log(blue('Startinmg downloads...')); // Download all files

            _context3.next = 24;
            return (0, _download.downloadAll)(protoDownloads);

          case 24:
            log(blue('Generating JS files...'));
            protoFiles = R.map(R.prop('filePath'), protoDownloads); // Generate JS code from proto files (with grpc-tools)

            _context3.next = 28;
            return generateJsPb({
              jsPath: jsPath,
              protoPath: protoPath,
              protoFiles: protoFiles
            });

          case 28:
            _context3.next = 30;
            return generateJsonPb({
              jsPath: jsPath,
              protoFiles: protoFiles
            });

          case 30:
            jsonPath = _context3.sent;
            // Load generated pbjs JSON schema
            protoSchema = require(jsonPath);
            log(blue('Generating TypeScript definitions...')); // Generate TypeScript definitions

            _context3.next = 35;
            return (0, _typings.generateTs)({
              jsPath: jsPath,
              protoPath: protoPath,
              protoSchema: protoSchema,
              version: version
            });

          case 35:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function run(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

exports.run = run;