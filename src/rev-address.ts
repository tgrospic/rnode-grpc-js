import { keccak256 } from 'js-sha3'
import { blake2bHex } from 'blakejs'
import { ec } from 'elliptic'
import { decodeBase16, encodeBase58, encodeBase16, decodeBase58safe } from './codecs'

/**
 * Represents REV address with different _sources_.
 *
 * REV address is derived from private key but not directly.
 * Public key is derived from private key, ETH address is derived from public key and
 * REV address is derived from ETH address.
 *
 * Private key -> public key -> ETH address -> REV address.
 */
export interface RevAddress {
  revAddr: string
  ethAddr?: string
  pubKey?: string
  privKey?: string
}

const secp256k1 = new ec('secp256k1')

// Algorithm to generate ETH and REV address is taken from RNode source
// https://github.com/rchain/rchain/blob/bf7a30e1/rholang/src/main/scala/coop/rchain/rholang/interpreter/util/AddressTools.scala#L47

// Prefix as defined in https://github.com/rchain/rchain/blob/c6721a6/rholang/src/main/scala/coop/rchain/rholang/interpreter/util/RevAddress.scala#L13
const prefix = { coinId : "000000", version: "00" }

/**
 * Parses REV address from ETH address.
 */
export function getAddrFromEth(ethAddrRaw: string): string | undefined {
  const ethAddr = ethAddrRaw.replace(/^0x/, '')
  if (!ethAddr || ethAddr.length !== 40) return

  // Hash ETH address
  const ethAddrBytes = decodeBase16(ethAddr)
  const ethHash      = keccak256(ethAddrBytes)

  // Add prefix with hash and calculate checksum (blake2b-256 hash)
  const payload      = `${prefix.coinId}${prefix.version}${ethHash}`
  const payloadBytes = decodeBase16(payload)
  const checksum     = blake2bHex(payloadBytes, void 666, 32).slice(0, 8)

  // Return REV address
  return encodeBase58(`${payload}${checksum}`)
}

/**
 * Parses REV address (with ETH address) from public key.
 */
export function getAddrFromPublicKey(publicKeyRaw: string): RevAddress | undefined {
  const publicKey = publicKeyRaw.replace(/^0x/, '')
  if (!publicKey || publicKey.length !== 130) return void 666

  // Public key bytes from hex string
  const pubKeyBytes = decodeBase16(publicKey)
  // Remove one byte from pk bytes and hash
  const pkHash = keccak256(pubKeyBytes.slice(1))
  // Take last 40 chars from hashed pk (ETH address)
  const pkHash40 = pkHash.slice(-40)

  // Return both REV and ETH address
  const revAddr = getAddrFromEth(pkHash40)
  return !!revAddr ? { revAddr, ethAddr: pkHash40 } : void 666
}

/**
 * Parses REV address (with ETH address and public key) from private key.
 */
export function getAddrFromPrivateKey(privateKeyRaw: string): RevAddress | undefined {
  const privateKey = privateKeyRaw.replace(/^0x/, '')
  if (!privateKey || privateKey.length !== 64) return

  // Generate REV address from private key
  const key    = secp256k1.keyFromPrivate(privateKey)
  const pubKey = key.getPublic('hex')
  const addr   = getAddrFromPublicKey(pubKey)

  // Return public key, REV and ETH address
  return !!addr ? { pubKey, ...addr } : void 666
}

/**
 * Verifes REV address as hex string.
 */
export function verifyRevAddr(revAddr: string): boolean {
  const revBytes = decodeBase58safe(revAddr)
  if (!revBytes) return false

  // Extract payload and checksum
  const revHex   = encodeBase16(revBytes)
  const payload  = revHex.slice(0, -8) // without checksum
  const checksum = revHex.slice(-8)    // without payload
  // Calculate checksum
  const payloadBytes = decodeBase16(payload)
  const checksumCalc = blake2bHex(payloadBytes, void 666, 32).slice(0, 8)

  return checksum === checksumCalc
}

/**
 * Generates a new REV address with corresponding private, public key and ETH address.
 */
export function newRevAddress(): RevAddress {
  // Generate new key and REV address from it
  const key     = secp256k1.genKeyPair()
  const privKey = key.getPrivate('hex')
  const addr    = getAddrFromPrivateKey(privKey) as RevAddress

  // Return private, public key, REV and ETH address
  return { privKey, ...addr }
}

/**
 * Parses REV address from different sources in string hex format.
 * (private key -> public key -> ETH address -> REV address)
 */
export function parseRevAddress(text: string): RevAddress | undefined {
  const val = text.replace(/^0x/, '').trim()

  // Account from private key, public key, ETH or REV address
  const fromPriv = getAddrFromPrivateKey(val)
  const fromPub  = getAddrFromPublicKey(val)
  const fromEth  = getAddrFromEth(val)
  const isRev    = verifyRevAddr(val)

  if (isRev) {
    return <RevAddress>{revAddr: text}
  } else if (!!fromPriv) {
    return {privKey: val, ...fromPriv}
  } else if (!!fromPub) {
    return {pubKey: val, ...fromPub}
  } else if (!!fromEth) {
    return {privKey: '', pubKey: '', ethAddr: val, revAddr: fromEth}
  } else return void 666
}
