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

require("core-js/modules/es.array.map");

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

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitExit = exports.filterAsync = exports.chainAsync = exports.mapAsync = exports.thenAll = exports.then = exports.flattenSchema = exports.protoTsTypesMapping = void 0;

require("regenerator-runtime/runtime");

var R = _interopRequireWildcard(require("ramda"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Mapping protobuf (simple) types to TypeScript types
var protoTsTypesMapping = [{
  proto: 'bool',
  ts: 'boolean'
}, {
  proto: 'string',
  ts: 'string'
}, {
  proto: 'int32',
  ts: 'number'
}, {
  proto: 'uint32',
  ts: 'number'
}, {
  proto: 'sint32',
  ts: 'number'
}, {
  proto: 'int64',
  ts: 'number | Long'
}, {
  proto: 'uint64',
  ts: 'number | Long'
}, {
  proto: 'sint64',
  ts: 'number | Long'
}, {
  proto: 'float',
  ts: 'number'
}, {
  proto: 'double',
  ts: 'number'
}, {
  proto: 'bytes',
  ts: 'Uint8Array'
}];
exports.protoTsTypesMapping = protoTsTypesMapping;
var ignoredNamespaces = [['scalapb'], ['google', 'protobuf'], ["coop", "rchain", "comm", "protocol", "routing"], // v0.9.12
["routing"] // v0.9.14
]; // Transform generated (protobufjs) JSON to a flat list of services and types

var flattenSchema = function flattenSchema(parentPath) {
  return function (schema) {
    var nestedProps = R.prop('nested', schema);
    var getProps = R.pipe(Object.entries, R.chain(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          name = _ref2[0],
          v = _ref2[1];

      var methods = v.methods,
          fields = v.fields,
          nested = v.nested;
      var namespace = parentPath;
      if (methods) return {
        namespace: namespace,
        type: 'service',
        name: name,
        methods: methods
      };else if (fields) {
        // Fix fields names the same way as protoc JS generator
        var fixName = function fixName(name) {
          var rule = fields[name].rule;
          var isList = rule === 'repeated';
          var listSuffix = isList ? 'List' : '';
          var genName = name.toLowerCase().replace(/_(\S)/g, function (_, x) {
            return x.toUpperCase();
          });
          return "".concat(genName).concat(listSuffix);
        };

        var fixFieldName = function fixFieldName(acc, _ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              k = _ref4[0],
              v = _ref4[1];

          var fieldName = fixName(k);
          return _objectSpread({}, acc, _defineProperty({}, fieldName, v));
        };

        var fieldsFixed = R.pipe(Object.entries, R.reduce(fixFieldName, {}));
        var nullables = R.pipe(R.propOr({}, 'oneofs'), Object.values, R.chain(R.prop('oneof')), R.map(fixName))(v);
        return {
          namespace: namespace,
          type: 'type',
          name: name,
          fields: fieldsFixed(fields),
          nullables: nullables
        };
      } else if (nested) return R.chain(flattenSchema([].concat(_toConsumableArray(parentPath), [name])), [v]);
    }), R.reject(R.isNil), R.reject(function (_ref5) {
      var namespace = _ref5.namespace;
      return R.contains(namespace, ignoredNamespaces);
    }));
    return getProps(nestedProps || {});
  };
};

exports.flattenSchema = flattenSchema;
var then = R.curry(function (f, p) {
  return p.then(f);
});
exports.then = then;

var thenAll = function thenAll(ps) {
  return Promise.all(ps);
};

exports.thenAll = thenAll;
var mapAsync = R.curry( /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(f, xs) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = thenAll;
            _context.t1 = R;
            _context.t2 = f;
            _context.next = 5;
            return xs;

          case 5:
            _context.t3 = _context.sent;
            _context.t4 = _context.t1.map.call(_context.t1, _context.t2, _context.t3);
            return _context.abrupt("return", (0, _context.t0)(_context.t4));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref6.apply(this, arguments);
  };
}());
exports.mapAsync = mapAsync;
var chainAsync = R.curry( /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(f, xs) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = R;
            _context2.t1 = mapAsync;
            _context2.t2 = f;
            _context2.next = 5;
            return xs;

          case 5:
            _context2.t3 = _context2.sent;
            _context2.next = 8;
            return (0, _context2.t1)(_context2.t2, _context2.t3);

          case 8:
            _context2.t4 = _context2.sent;
            return _context2.abrupt("return", _context2.t0.flatten.call(_context2.t0, _context2.t4));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref7.apply(this, arguments);
  };
}());
exports.chainAsync = chainAsync;
var filterAsync = R.curry( /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(pred, xs) {
    var predX, predXs;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            predX = /*#__PURE__*/function () {
              var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(x) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return pred(x);

                      case 2:
                        _context3.t0 = _context3.sent;
                        _context3.t1 = x;
                        return _context3.abrupt("return", {
                          p: _context3.t0,
                          x: _context3.t1
                        });

                      case 5:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function predX(_x7) {
                return _ref9.apply(this, arguments);
              };
            }();

            _context4.t0 = mapAsync;
            _context4.t1 = predX;
            _context4.next = 5;
            return xs;

          case 5:
            _context4.t2 = _context4.sent;
            _context4.next = 8;
            return (0, _context4.t0)(_context4.t1, _context4.t2);

          case 8:
            predXs = _context4.sent;
            return _context4.abrupt("return", R.pipe(R.filter(R.prop('p')), mapAsync(R.prop('x')))(predXs));

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x5, _x6) {
    return _ref8.apply(this, arguments);
  };
}());
exports.filterAsync = filterAsync;

var waitExit = function waitExit(proc, result, error) {
  return new Promise(function (resolve, reject) {
    proc.on('exit', function (code) {
      code === 0 ? resolve(result) : reject(error);
    });
  });
};

exports.waitExit = waitExit;