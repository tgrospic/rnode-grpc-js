"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.bind");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rnodeProtobuf = exports.rnodeRepl = exports.rnodePropose = exports.rnodeDeploy = exports.rnodeService = void 0;

require("regenerator-runtime/runtime");

var R = _interopRequireWildcard(require("ramda"));

var _lib = require("./lib");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _console = console,
    log = _console.log,
    warn = _console.warn;
var isBrowser = (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && !!window.document;
var getProtoSerializer = R.curry(function (getType, name) {
  var _getType = getType(name),
      constructor = _getType.constructor;

  var serialize = function serialize(obj) {
    var t = fillObject(getType, name, obj);
    return t.serializeBinary();
    /* Uint8Array */
  };

  var deserialize = function deserialize(bytes) {
    var msg = constructor.deserializeBinary(bytes);
    return msg.toObject();
  };

  var create = function create(opt) {
    return new constructor(opt);
  };

  return {
    serialize: serialize,
    deserialize: deserialize,
    create: create
  };
});

var makeGrpcProtocol = function makeGrpcProtocol(_ref) {
  var host = _ref.host,
      grpcLib = _ref.grpcLib,
      _ref$clientOptions = _ref.clientOptions,
      clientOptions = _ref$clientOptions === void 0 ? {} : _ref$clientOptions;
  if (!grpcLib) throw Error("gRPC library not provided (grpcLib option)."); // gRPC clients

  if (isBrowser) {
    if (!grpcLib.AbstractClientBase) throw Error("Browser detected but 'grpc-web' instance not recognized."); // Browser support (grpc-web)

    var MethodInfo = grpcLib.AbstractClientBase.MethodInfo; // https://github.com/grpc/grpc-web/blob/8b501a96f/javascript/net/grpc/web/grpcwebclientbase.js#L45

    var client = new grpcLib.GrpcWebClientBase(_objectSpread({
      format: 'binary'
    }, clientOptions));
    return {
      client: client,
      MethodInfo: MethodInfo
    };
  } else {
    if (!grpcLib.Client) throw Error("Node.js detected but 'grpc' instance not recognized."); // Nodejs support (grpc-js)

    var credentials = clientOptions.credentials,
        options = _objectWithoutProperties(clientOptions, ["credentials"]);

    var creds = credentials || grpcLib.credentials.createInsecure(); // https://github.com/grpc/grpc-node/blob/b05caec/packages/grpc-js/src/client.ts#L67

    var _client = new grpcLib.Client(host, creds, options);

    return {
      client: _client
    };
  }
};

var init = function init(_ref2) {
  var protoSchema = _ref2.protoSchema;
  var schemaFlat = R.chain((0, _lib.flattenSchema)([]), [protoSchema]);

  var isType = function isType(_ref3) {
    var type = _ref3.type;
    return type === 'type';
  };

  var isName = function isName(typeName) {
    return function (_ref4) {
      var name = _ref4.name;
      return name === typeName;
    };
  };

  var types = R.filter(isType, schemaFlat); // Returns type definition and type constructor (protoc generated)

  var getType = function getType(name) {
    var typeDef = R.find(isName(name), types);
    var namespace = typeDef.namespace;
    var typePath = R.lensPath([].concat(_toConsumableArray(namespace), [name])); // Get type constructor from `proto` global object generated by `protoc` tool

    return {
      constructor: R.view(typePath, proto),
      def: typeDef
    };
  }; // Methods defined in protobufjs generated JSON schema


  var methods = R.pipe(R.filter(R.propEq('type', 'service')), R.map(function (service) {
    return R.map(function (m) {
      return _objectSpread({}, m, {
        service: service
      });
    }, service.methods);
  }), R.mergeAll)(schemaFlat);
  return {
    getType: getType,
    methods: methods,
    types: types
  };
};

var resolveEither = function resolveEither(eitherObj) {
  var success = eitherObj.success,
      error = eitherObj.error;

  if (success) {
    var _success$response = success.response,
        valBytes = _success$response.value,
        typeUrl = _success$response.typeUrl;

    var _typeUrl$match = typeUrl.match(/^type.rchain.coop\/(.+)$/),
        _typeUrl$match2 = _slicedToArray(_typeUrl$match, 2),
        _ = _typeUrl$match2[0],
        typeFullName = _typeUrl$match2[1];

    var typeLens = R.lensPath(typeFullName.split('.')); // Get type constructor from `proto` global object generated by `protoc` tool

    var typeDef = R.view(typeLens, proto); // Deserialize message and convert to JS object

    return typeDef.deserializeBinary(valBytes).toObject();
  } else if (error) {
    var messagesList = error.messagesList;
    throw Error("Either error: ".concat(messagesList.join(', ')));
  }
};

var resolveError = R.curry(function (typeName, getType, msgObj) {
  if (typeName === 'Either') {
    return resolveEither(msgObj);
  } // Detect errors inside message


  var respTypeDef = getType(typeName);
  var errorTypeLens = R.lensPath('def.fields.error.type'.split('.'));
  var errorType = R.view(errorTypeLens, respTypeDef); // Throw message errors (ServiceError)

  if (errorType === 'ServiceError' && msgObj.error) {
    throw Error("Service error: ".concat(msgObj.error.messagesList.join(', ')));
  }

  return msgObj;
});
var simpleTypes = R.map(R.prop('proto'), _lib.protoTsTypesMapping);
var fillObject = R.curry(function (getType, typeName, input) {
  var type = getType(typeName);
  if (!type) throw Error("Type not found: ".concat(typeName));
  var req = new type.constructor();
  Object.entries(input || {}).forEach(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        key = _ref6[0],
        v = _ref6[1];

    var field = type.def.fields[key];

    if (!field) {
      warn("Property not found: ".concat(typeName, ".").concat(key));
      return;
    } // Handle collections (proto repeated)


    var isListType = field.rule === 'repeated';

    var _key = _toArray(key),
        fst = _key[0],
        snd = _key[1],
        tail = _key.slice(2);

    var setterName = function setterName(f) {
      return R.flatten(['set', fst.toUpperCase(), snd, f(tail.join(''))]).join('');
    };

    var setter = req[setterName(R.identity)] || req[setterName(R.toLower)];
    !setter && warn("Property setter not found ".concat(typeName, ".").concat(key, " (<gen-js>.").concat(setterName(R.identity), ")")); // Create property value / recursively resolve complex types

    var val = R.includes(field.type, simpleTypes) // Simple type
    ? v // Complex type
    : isListType ? R.map(fillObject(getType, field.type), v) : fillObject(getType, field.type, v); // Set property value

    setter.bind(req)(val);
  });
  return req;
});
var createApiMethod = R.curry(function (_ref7, getType, method, name) {
  var protocol = _ref7.protocol,
      host = _ref7.host;
  return /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(input, meta) {
      var isReponseStream, namespace, serviceName, methodName, reqProto, resProto, client, methodInfo, remoteMethod, comm, _comm;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              isReponseStream = !!method.responseStream; // Build service method name

              namespace = method.service.namespace.join('.');
              serviceName = method.service.name;
              methodName = "/".concat(namespace, ".").concat(serviceName, "/").concat(name); // Request/response protobuf serializers

              reqProto = getProtoSerializer(getType, method.requestType);
              resProto = getProtoSerializer(getType, method.responseType);
              client = protocol.client;

              if (!isBrowser) {
                _context.next = 18;
                break;
              }

              // Browser support (grpc-web)
              methodInfo = new protocol.MethodInfo(null, reqProto.serialize, resProto.deserialize); // Select type of method

              remoteMethod = isReponseStream ? client.serverStreaming.bind(client) : client.unaryCall.bind(client); // Call remote method

              comm = remoteMethod("".concat(host).concat(methodName), input, meta || {}, methodInfo);

              if (!isReponseStream) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("return", new Promise(function (resolve, reject) {
                var streamResult = [];
                comm.on('data', function (resultMsg) {
                  try {
                    var result = resolveError(method.responseType, getType, resultMsg);
                    streamResult.push(result);
                  } catch (err) {
                    reject(err);
                  }
                });
                comm.on('error', reject);
                comm.on('end', function (_) {
                  resolve(streamResult);
                });
              }));

            case 15:
              return _context.abrupt("return", comm.then(resolveError(method.responseType, getType)));

            case 16:
              _context.next = 24;
              break;

            case 18:
              if (!isReponseStream) {
                _context.next = 23;
                break;
              }

              // Call remote method
              _comm = client.makeServerStreamRequest(methodName, R.pipe(reqProto.serialize, Buffer.from), resProto.deserialize, input, meta || {});
              return _context.abrupt("return", new Promise(function (resolve, reject) {
                var streamResult = [];

                _comm.on('data', function (resultMsg) {
                  try {
                    var result = resolveError(method.responseType, getType, resultMsg);
                    streamResult.push(result);
                  } catch (err) {
                    reject(err);
                  }
                });

                _comm.on('error', reject);

                _comm.on('end', function (_) {
                  resolve(streamResult);
                });
              }));

            case 23:
              return _context.abrupt("return", new Promise(function (resolve, reject) {
                // Call remote method
                client.makeUnaryRequest(methodName, R.pipe(reqProto.serialize, Buffer.from), resProto.deserialize, input, meta || {}, function (err, resultMsg) {
                  if (err) reject(err);else {
                    try {
                      // Resolve Either value
                      var result = resolveError(method.responseType, getType, resultMsg);
                      resolve(result);
                    } catch (err) {
                      reject(err);
                    }
                  }
                });
              }));

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref8.apply(this, arguments);
    };
  }();
});

var rnodeService = function rnodeService(options) {
  var _init = init(options),
      getType = _init.getType,
      methods = _init.methods; // Create client protocol


  var protocol = makeGrpcProtocol(options); // Create RNode service API from proto definition

  return R.mapObjIndexed(createApiMethod(_objectSpread({}, options, {
    protocol: protocol
  }), getType), methods);
}; // Different name for each service to support TypeScript definitions


exports.rnodeService = rnodeService;
var rnodeDeploy = rnodeService;
exports.rnodeDeploy = rnodeDeploy;
var rnodePropose = rnodeService;
exports.rnodePropose = rnodePropose;
var rnodeRepl = rnodeService;
exports.rnodeRepl = rnodeRepl;

var rnodeProtobuf = function rnodeProtobuf(_ref9) {
  var protoSchema = _ref9.protoSchema;

  var _init2 = init({
    protoSchema: protoSchema
  }),
      getType = _init2.getType,
      types = _init2.types;

  var getTypeOp = function getTypeOp(_ref10) {
    var name = _ref10.name;
    return _defineProperty({}, name, getProtoSerializer(getType, name));
  };

  return R.pipe(R.map(getTypeOp), R.mergeAll)(types);
};

exports.rnodeProtobuf = rnodeProtobuf;