import fs from 'fs-extra'
import request from 'request'
import * as R from 'ramda'

const { log, error } = console

export const downLoadFile = async opt => {
  const { downloadUrl, filePath } = opt
  const file = fs.createWriteStream(filePath)
  const cleanUp = () => {
    file.close()
    return fs.remove(filePath)
  }
  log('Downloading', downloadUrl)
  return new Promise((resolve, reject) => {
    request.get(downloadUrl)
      .on('response', res => {
        if (res.statusCode !== 200) {
          cleanUp()
          reject(Error(`File not found: ${downloadUrl}`))
        }
      })
      .on('error', reject).pipe(file)
    file.on('finish', () => {
      file.close()
      resolve(opt)
    })
    file.on('error', err => {
      cleanUp()
      reject(err)
    })
  })
}

export const downloadAll = R.pipe(
  R.map(downLoadFile),
  Promise.all.bind(Promise),
)

export const fetch = opt => new Promise((resolve, reject) => {
  request(opt, (err, response, body) => {
    const isJson = !!opt.json
    if (err) reject(err)
    else resolve(isJson ? body : response)
  })
})
