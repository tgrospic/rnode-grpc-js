"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.object.values");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/esnext.string.match-all");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateTs = void 0;

require("regenerator-runtime/runtime");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var R = _interopRequireWildcard(require("ramda"));

var _lib = require("../lib");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _console = console,
    log = _console.log;
var readFile = _fsExtra["default"].readFile,
    writeFile = _fsExtra["default"].writeFile,
    readdir = _fsExtra["default"].readdir,
    stat = _fsExtra["default"].stat;

var isFile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(checkPath) {
    var s;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return stat(checkPath);

          case 2:
            s = _context.sent;
            return _context.abrupt("return", s.isFile());

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isFile(_x) {
    return _ref.apply(this, arguments);
  };
}();

var readProtoFiles = function readProtoFiles(protoPath) {
  return R.pipeWith(_lib.then, [readdir, (0, _lib.mapAsync)( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(fileName) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", _path["default"].resolve(protoPath, fileName));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }()), (0, _lib.filterAsync)(isFile), (0, _lib.mapAsync)(function (fp) {
    return readFile(fp, 'utf8');
  })])(protoPath);
}; // Parse service name


var serviceRegex = /service\s+([a-zA-Z0-9_-]+)/; // Parse method definition with previous comment where is the return type

var serviceMethodRegex = /(\/\/ Returns on success ([a-zA-Z0-9_-]+)\s+)?rpc\s+([a-zA-Z0-9_-]+)\(([a-zA-Z0-9_-]+)\)\s*returns\s*\(\s*(stream)?\s*Either\s*\)\s*{\s*}/g;

var parseProto = function parseProto(protoStr) {
  var _ref3 = protoStr.match(serviceRegex) || [],
      _ref4 = _slicedToArray(_ref3, 2),
      _ = _ref4[0],
      service = _ref4[1];

  var matches = Array.from(protoStr.matchAll(serviceMethodRegex));

  var methodInfo = function methodInfo(_ref5) {
    var _ref6 = _slicedToArray(_ref5, 6),
        outType = _ref6[2],
        name = _ref6[3],
        inType = _ref6[4],
        stream = _ref6[5];

    return {
      name: name,
      inType: inType,
      outType: outType,
      isStream: stream === 'stream'
    };
  };

  var toObj = function toObj(acc, _ref7) {
    var name = _ref7.name,
        outType = _ref7.outType;
    return _objectSpread({}, acc, _defineProperty({}, name, outType));
  };

  var methods = matches.map(methodInfo).reduce(toObj, {});

  if (!R.isEmpty(methods)) {
    return _defineProperty({}, service, methods);
  }
};

var parseProtoReponseMeta = R.pipe(R.map(parseProto), R.reject(R.isNil), R.mergeAll);

var methodResolveResponse = function methodResolveResponse(service, meta) {
  return function (method, name) {
    var requestType = method.requestType,
        responseType = method.responseType,
        responseStream = method.responseStream;
    var eitherTypeLens = R.lensPath([service, name]);
    var eitherType = R.view(eitherTypeLens, meta);
    var isResponseEither = responseType === 'Either'; // Replace Either with correct type

    var outType = isResponseEither ? eitherType : responseType;
    return {
      name: name,
      requestType: requestType,
      responseType: outType,
      responseStream: responseStream
    };
  };
};

var serviceResolveResponse = function serviceResolveResponse(meta) {
  return function (_ref9) {
    var name = _ref9.name,
        methods = _ref9.methods;
    return {
      name: name,
      methods: R.mapObjIndexed(methodResolveResponse(name, meta), methods)
    };
  };
}; // Type helpers


var getTsType = function getTsType(protoType) {
  return R.find(function (x) {
    return x.proto === protoType;
  }, _lib.protoTsTypesMapping);
}; // Generates service method


var methodCodeGen = function methodCodeGen(getType) {
  return function (_ref10) {
    var _ref11 = _slicedToArray(_ref10, 2),
        name = _ref11[0],
        _ref11$ = _ref11[1],
        requestType = _ref11$.requestType,
        responseType = _ref11$.responseType,
        responseStream = _ref11$.responseStream;

    var _getType = getType(requestType),
        fields = _getType.fields;

    var isSimpleType = function isSimpleType(_ref12) {
      var type = _ref12.type;
      return getTsType(type);
    };

    var nullable = R.all(isSimpleType, Object.values(fields || {})) ? '?' : '';
    var suffix = responseStream ? '[]' : '';
    return "".concat(name, "(_").concat(nullable, ": ").concat(requestType, "): Promise<").concat(responseType || 'Unit').concat(suffix, ">");
  };
}; // Generates code for service interface


var serviceCodeGen = function serviceCodeGen(getType) {
  return function (_ref13) {
    var name = _ref13.name,
        methods = _ref13.methods;
    return (// Indentation is important, it's used in generated file
      "interface ".concat(name, " {\n    ").concat(Object.entries(methods).map(methodCodeGen(getType)).join('\n    '), "\n  }")
    );
  };
}; // Generates code for type field (property)


var fieldCodeGen = function fieldCodeGen(nullables, key, _ref14) {
  var type = _ref14.type,
      rule = _ref14.rule;
  var tsType = getTsType(type);
  var isList = rule === 'repeated';
  var nullable = tsType || isList || R.includes(key, nullables) ? '?' : '';
  var suffixList = isList ? '[]' : '';
  var origType = tsType && tsType.ts !== type ? " /* ".concat(type, " */") : '';
  return tsType ? "".concat(key).concat(nullable, ": ").concat(tsType.ts).concat(suffixList).concat(origType) : "".concat(key).concat(nullable, ": ").concat(type).concat(suffixList);
}; // Generates code for type interface


var typeCodeGen = function typeCodeGen(_ref15) {
  var name = _ref15.name,
      fields = _ref15.fields,
      nullables = _ref15.nullables;

  var fieldGenKV = function fieldGenKV(_ref16) {
    var _ref17 = _slicedToArray(_ref16, 2),
        k = _ref17[0],
        field = _ref17[1];

    return fieldCodeGen(nullables, k, field);
  };

  var isServiceError = function isServiceError(_ref18) {
    var _ref19 = _slicedToArray(_ref18, 2),
        k = _ref19[0],
        type = _ref19[1].type;

    return k === 'error' && type === 'ServiceError';
  };

  var genFields = R.pipe(Object.entries, R.reject(isServiceError), R.map(fieldGenKV)); // Indentation is important, it's used in generated file

  return "interface ".concat(name, " {\n    ").concat(genFields(fields).join('\n    '), "\n  }");
}; // Generates code for binary operations (exposed from generated JS code)


var binaryOpCodeGen = function binaryOpCodeGen(_ref20) {
  var name = _ref20.name;
  // Indentation is important, it's used in generated file
  return "".concat(name, ": BinaryOp<").concat(name, ">");
};

var generateTs = /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref21) {
    var jsPath, protoPath, protoSchema, version, schemaFlat, types, getType, getServices, protoFiles, servicesMeta, services, tmplTsPath, tmplTs, tsGenPath, schemaPath, servicesGen, typesGen, binaryGen, tsGen1, tsGen2, tsGen3, tsGen4;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            jsPath = _ref21.jsPath, protoPath = _ref21.protoPath, protoSchema = _ref21.protoSchema, version = _ref21.version;
            // Schema definition
            schemaFlat = R.chain((0, _lib.flattenSchema)([]), [protoSchema]);
            types = R.filter(R.propEq('type', 'type'), schemaFlat);

            getType = function getType(name) {
              return R.find(R.propEq('name', name), types);
            };

            getServices = function getServices(meta) {
              return R.pipe(R.filter(R.propEq('type', 'service')), R.map(serviceResolveResponse(meta)))(schemaFlat);
            }; // Read proto files and TypeScript definition template


            _context3.next = 7;
            return readProtoFiles(protoPath);

          case 7:
            protoFiles = _context3.sent;
            servicesMeta = parseProtoReponseMeta(protoFiles);
            services = getServices(servicesMeta);
            tmplTsPath = _path["default"].resolve(__dirname, './rnode-grpc-js-tmpl.d.ts');
            _context3.next = 13;
            return readFile(tmplTsPath, 'utf8');

          case 13:
            tmplTs = _context3.sent;
            tsGenPath = _path["default"].resolve(jsPath, 'rnode-grpc-js.d.ts');
            schemaPath = _path["default"].resolve(jsPath, 'rnode-api-schema.json'); // Generate services and types

            servicesGen = R.map(serviceCodeGen(getType), services);
            typesGen = R.map(typeCodeGen, types);
            binaryGen = R.map(binaryOpCodeGen, types); // Replace in template

            tsGen1 = tmplTs.replace('/*__SERVICES__*/', servicesGen.join('\n\n  '));
            tsGen2 = tsGen1.replace('/*__TYPES__*/', typesGen.join('\n\n  '));
            tsGen3 = tsGen2.replace('/*__TYPES_BINARY__*/', binaryGen.join('\n    '));
            tsGen4 = tsGen3.replace('__RNODE_VERSION__', version); // Write generated TypeScript file

            _context3.next = 25;
            return writeFile(tsGenPath, tsGen4);

          case 25:
            _context3.next = 27;
            return writeFile(schemaPath, JSON.stringify(schemaFlat, null, 2));

          case 27:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function generateTs(_x3) {
    return _ref22.apply(this, arguments);
  };
}();

exports.generateTs = generateTs;