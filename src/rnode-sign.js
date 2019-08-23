import blake from 'blakejs'

export const signDeploy = (key, deployObj) => {
  const publicKey = Uint8Array.from(key.getPublic('array'))
  const {
    term,
    timestamp = new Date().getTime(),
    phloPrice,
    phloLimit,
    sigAlgorithm = 'secp256k1',
    validAfterBlockNumber,
    deployer = publicKey,
  } = deployObj

  // Get DeployData contructor from global proto object
  const DeployData = proto.coop.rchain.casper.protocol['DeployData']

  // Serialize deploy data for signing
  const dd = new DeployData()
  dd.setTerm(term)
  dd.setTimestamp(timestamp)
  dd.setPhloprice(phloPrice)
  dd.setPhlolimit(phloLimit)
  dd.setValidafterblocknumber(validAfterBlockNumber)
  const deploySerialized = dd.serializeBinary()

  // Hash and sign serialized deploy
  const hashed = blake.blake2bHex(deploySerialized, void 666, 32)
  const sigArray = key.sign(hashed, {canonical: true}).toDER('array')
  const sig = Uint8Array.from(sigArray)

  // Return deploy object / ready for sending to RNode
  return {
    term, timestamp,
    phloPrice, phloLimit,
    deployer, sig, sigAlgorithm,
    validAfterBlockNumber,
  }
}
