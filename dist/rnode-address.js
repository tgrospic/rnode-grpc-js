"use strict";

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

require("core-js/modules/es.array-buffer.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.parse-int");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.pad-start");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.typed-array.uint8-array");

require("core-js/modules/es.typed-array.copy-within");

require("core-js/modules/es.typed-array.every");

require("core-js/modules/es.typed-array.fill");

require("core-js/modules/es.typed-array.filter");

require("core-js/modules/es.typed-array.find");

require("core-js/modules/es.typed-array.find-index");

require("core-js/modules/es.typed-array.for-each");

require("core-js/modules/es.typed-array.from");

require("core-js/modules/es.typed-array.includes");

require("core-js/modules/es.typed-array.index-of");

require("core-js/modules/es.typed-array.iterator");

require("core-js/modules/es.typed-array.join");

require("core-js/modules/es.typed-array.last-index-of");

require("core-js/modules/es.typed-array.map");

require("core-js/modules/es.typed-array.reduce");

require("core-js/modules/es.typed-array.reduce-right");

require("core-js/modules/es.typed-array.reverse");

require("core-js/modules/es.typed-array.set");

require("core-js/modules/es.typed-array.slice");

require("core-js/modules/es.typed-array.some");

require("core-js/modules/es.typed-array.sort");

require("core-js/modules/es.typed-array.subarray");

require("core-js/modules/es.typed-array.to-locale-string");

require("core-js/modules/es.typed-array.to-string");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyRevAddr = exports.newRevAddr = exports.getAddrFromPrivateKey = exports.getAddrFromPublicKey = exports.getAddrFromEth = void 0;

var _jsSha = require("js-sha3");

var _blakejs = _interopRequireDefault(require("blakejs"));

var _base = _interopRequireDefault(require("base-58"));

var _elliptic = require("elliptic");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var secp256k1 = new _elliptic.ec('secp256k1'); // Algorithm to generate ETH and REV address is taken from RNode source
// https://github.com/rchain/rchain/blob/bf7a30e1/rholang/src/main/scala/coop/rchain/rholang/interpreter/util/AddressTools.scala#L47
// Prefix as defined in https://github.com/rchain/rchain/blob/c6721a6/rholang/src/main/scala/coop/rchain/rholang/interpreter/util/RevAddress.scala#L13

var prefix = {
  coinId: "000000",
  version: "00"
};

var encodeBase16 = function encodeBase16(bytes) {
  return Array.from(bytes).map(function (x) {
    return (x & 0xff).toString(16).padStart(2, 0);
  }).join('');
};

var decodeBase16 = function decodeBase16(hexStr) {
  var removed0x = hexStr.replace(/^0x/, '');

  var byte2hex = function byte2hex(_ref, x) {
    var _ref2 = _slicedToArray(_ref, 2),
        arr = _ref2[0],
        bhi = _ref2[1];

    return bhi ? [[].concat(_toConsumableArray(arr), [parseInt("".concat(bhi).concat(x), 16)])] : [arr, x];
  };

  var _Array$from$reduce = Array.from(removed0x).reduce(byte2hex, [[]]),
      _Array$from$reduce2 = _slicedToArray(_Array$from$reduce, 1),
      resArr = _Array$from$reduce2[0];

  return Uint8Array.from(resArr);
};

var encodeBase58 = function encodeBase58(hexStr) {
  var bytes = decodeBase16(hexStr);
  return _base["default"].encode(bytes);
};

var safeDecodeBase58 = function safeDecodeBase58(str) {
  try {
    return _base["default"].decode(str);
  } catch (_unused) {}
};

var getAddrFromEth = function getAddrFromEth(ethAddrRaw) {
  var ethAddr = ethAddrRaw.replace(/^0x/, '');
  if (!ethAddr || ethAddr.length !== 40) return; // Hash ETH address

  var ethAddrBytes = decodeBase16(ethAddr);
  var ethHash = (0, _jsSha.keccak256)(ethAddrBytes); // Add prefix with hash and calculate checksum (blake2b-256 hash)

  var payload = "".concat(prefix.coinId).concat(prefix.version).concat(ethHash);
  var payloadBytes = decodeBase16(payload);

  var checksum = _blakejs["default"].blake2bHex(payloadBytes, void 666, 32).slice(0, 8); // Return REV address


  return encodeBase58("".concat(payload).concat(checksum));
};

exports.getAddrFromEth = getAddrFromEth;

var getAddrFromPublicKey = function getAddrFromPublicKey(publicKeyRaw) {
  var publicKey = publicKeyRaw.replace(/^0x/, '');
  if (!publicKey || publicKey.length !== 130) return; // Public key bytes from hex string

  var pubKeyBytes = decodeBase16(publicKey); // Remove one byte from pk bytes and hash

  var pkHash = (0, _jsSha.keccak256)(pubKeyBytes.slice(1)); // Take last 40 chars from hashed pk (ETH address)

  var pkHash40 = pkHash.slice(-40); // Return both REV and ETH address

  return {
    revAddr: getAddrFromEth(pkHash40),
    ethAddr: pkHash40
  };
};

exports.getAddrFromPublicKey = getAddrFromPublicKey;

var getAddrFromPrivateKey = function getAddrFromPrivateKey(privateKeyRaw) {
  var privateKey = privateKeyRaw.replace(/^0x/, '');
  if (!privateKey || privateKey.length !== 64) return; // Generate REV address from private key

  var key = secp256k1.keyFromPrivate(privateKey);
  var pubKey = key.getPublic('hex');
  var addr = getAddrFromPublicKey(pubKey); // Return public key, REV and ETH address

  return _objectSpread({
    pubKey: pubKey
  }, addr);
};

exports.getAddrFromPrivateKey = getAddrFromPrivateKey;

var newRevAddr = function newRevAddr() {
  // Generate new key and REV address from it
  var key = secp256k1.genKeyPair();
  var privKey = key.getPrivate('hex');
  var addr = getAddrFromPrivateKey(privKey); // Return public key, REV and ETH address

  return _objectSpread({
    privKey: privKey
  }, addr);
};

exports.newRevAddr = newRevAddr;

var verifyRevAddr = function verifyRevAddr(revAddr) {
  var revBytes = safeDecodeBase58(revAddr);
  if (!revBytes) return; // Extract payload and checksum

  var revHex = encodeBase16(revBytes);
  var payload = revHex.slice(0, -8); // without checksum

  var checksum = revHex.slice(-8); // without payload
  // Calculate checksum

  var payloadBytes = decodeBase16(payload);

  var checksumCalc = _blakejs["default"].blake2bHex(payloadBytes, void 666, 32).slice(0, 8);

  return checksum === checksumCalc;
};

exports.verifyRevAddr = verifyRevAddr;