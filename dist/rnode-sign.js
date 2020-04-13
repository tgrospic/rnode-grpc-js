"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array-buffer.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyDeploy = exports.signDeploy = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _blakejs = _interopRequireDefault(require("blakejs"));

var _elliptic = require("elliptic");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Fix for ec.keyFromPrivate not accepting KeyPair
// - detect KeyPair if it have `sign` function
var getSignKey = function getSignKey(crypt, pk) {
  return R.is(Function, pk.sign) ? pk : crypt.keyFromPrivate(pk);
}; // Get DeployData contructor from global proto object


var getDeployDataConstructor = function getDeployDataConstructor() {
  var _ref = proto.casper ? proto.casper : proto.coop.rchain.casper.protocol,
      DeployDataProto = _ref.DeployDataProto,
      DeployData = _ref.DeployData; // v0.9.12 - DeployData
  // v0.9.14 - DeployDataProto


  return DeployDataProto || DeployData;
};

var signDeploy = function signDeploy(privateKey, deployObj) {
  var term = deployObj.term,
      _deployObj$timestamp = deployObj.timestamp,
      timestamp = _deployObj$timestamp === void 0 ? new Date().getTime() : _deployObj$timestamp,
      phloprice = deployObj.phloprice,
      phlolimit = deployObj.phlolimit,
      _deployObj$validafter = deployObj.validafterblocknumber,
      validafterblocknumber = _deployObj$validafter === void 0 ? -1 : _deployObj$validafter,
      _deployObj$sigalgorit = deployObj.sigalgorithm,
      sigalgorithm = _deployObj$sigalgorit === void 0 ? 'secp256k1' : _deployObj$sigalgorit; // Get DeployData contructor from global proto object

  var DeployData = getDeployDataConstructor(); // Serialize deploy data for signing

  var dd = new DeployData();
  dd.setTerm(term);
  dd.setTimestamp(timestamp);
  dd.setPhloprice(phloprice);
  dd.setPhlolimit(phlolimit);
  dd.setValidafterblocknumber(validafterblocknumber);
  var deploySerialized = dd.serializeBinary(); // Signing key

  var crypt = new _elliptic.ec(sigalgorithm);
  var key = getSignKey(crypt, privateKey);
  var deployer = Uint8Array.from(key.getPublic('array')); // Hash and sign serialized deploy

  var hashed = _blakejs["default"].blake2bHex(deploySerialized, void 666, 32);

  var sigArray = key.sign(hashed, {
    canonical: true
  }).toDER('array');
  var sig = Uint8Array.from(sigArray); // Return deploy object / ready for sending to RNode

  return {
    term: term,
    timestamp: timestamp,
    phloprice: phloprice,
    phlolimit: phlolimit,
    validafterblocknumber: validafterblocknumber,
    deployer: deployer,
    sig: sig,
    sigalgorithm: sigalgorithm
  };
};

exports.signDeploy = signDeploy;

var verifyDeploy = function verifyDeploy(deployObj) {
  var term = deployObj.term,
      timestamp = deployObj.timestamp,
      phloprice = deployObj.phloprice,
      phlolimit = deployObj.phlolimit,
      validafterblocknumber = deployObj.validafterblocknumber,
      sigalgorithm = deployObj.sigalgorithm,
      sig = deployObj.sig,
      deployer = deployObj.deployer; // Get DeployData contructor from global proto object

  var DeployData = getDeployDataConstructor(); // Serialize deploy data for signing

  var dd = new DeployData();
  dd.setTerm(term);
  dd.setTimestamp(timestamp);
  dd.setPhloprice(phloprice);
  dd.setPhlolimit(phlolimit);
  dd.setValidafterblocknumber(validafterblocknumber);
  var deploySerialized = dd.serializeBinary(); // Signing public key to verify

  var crypt = new _elliptic.ec(sigalgorithm);
  var key = crypt.keyFromPublic(deployer); // Hash and verify signature

  var hashed = _blakejs["default"].blake2bHex(deploySerialized, void 666, 32);

  var isValid = key.verify(hashed, sig);
  return isValid;
};

exports.verifyDeploy = verifyDeploy;