import * as R from 'ramda'
import blake from 'blakejs'
import { ec } from 'elliptic'

// Fix for ec.keyFromPrivate not accepting KeyPair
// - detect KeyPair if it have `sign` function
const getSignKey = (crypt, pk) =>
  R.is(Function, pk.sign) ? pk : crypt.keyFromPrivate(pk)

export const signDeploy = (privateKey, deployObj) => {
  const {
    term,
    timestamp = new Date().getTime(),
    phloPrice,
    phloLimit,
    validAfterBlockNumber,
    sigAlgorithm = 'secp256k1',
  } = deployObj

  // Get DeployData contructor from global proto object
  const { DeployData } = proto.coop.rchain.casper.protocol

  // Serialize deploy data for signing
  const dd = new DeployData()
  dd.setTerm(term)
  dd.setTimestamp(timestamp)
  dd.setPhloprice(phloPrice)
  dd.setPhlolimit(phloLimit)
  dd.setValidafterblocknumber(validAfterBlockNumber)
  const deploySerialized = dd.serializeBinary()

  // Signing key
  const crypt    = new ec(sigAlgorithm)
  const key      = getSignKey(crypt, privateKey)
  const deployer = Uint8Array.from(key.getPublic('array'))
  // Hash and sign serialized deploy
  const hashed   = blake.blake2bHex(deploySerialized, void 666, 32)
  const sigArray = key.sign(hashed, {canonical: true}).toDER('array')
  const sig      = Uint8Array.from(sigArray)

  // Return deploy object / ready for sending to RNode
  return {
    term, timestamp,
    phloPrice, phloLimit,
    validAfterBlockNumber,
    deployer, sig, sigAlgorithm,
  }
}

export const verifyDeploy = deployObj => {
  const {
    term,
    timestamp,
    phloPrice,
    phloLimit,
    validAfterBlockNumber,
    sigAlgorithm,
    sig,
    deployer,
  } = deployObj

  // Get DeployData contructor from global proto object
  const { DeployData } = proto.coop.rchain.casper.protocol

  // Serialize deploy data for signing
  const dd = new DeployData()
  dd.setTerm(term)
  dd.setTimestamp(timestamp)
  dd.setPhloprice(phloPrice)
  dd.setPhlolimit(phloLimit)
  dd.setValidafterblocknumber(validAfterBlockNumber)
  const deploySerialized = dd.serializeBinary()

  // Signing public key to verify
  const crypt   = new ec(sigAlgorithm)
  const key     = crypt.keyFromPublic(deployer)
  // Hash and verify signature
  const hashed  = blake.blake2bHex(deploySerialized, void 666, 32)
  const isValid = key.verify(hashed, sig)

  return isValid
}
