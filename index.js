'use strict'

const { promisify } = require('util')
const zlib = require('zlib')

const hasNativeAPI = Boolean(zlib.brotliCompress)

const noop = {
  compress: data => data,
  decompress: data => data
}

const createCompress = ({
  enable = true,
  serialize = JSON.stringify,
  deserialize = JSON.parse
} = {}) => {
  if (!enable) return noop

  const compress = hasNativeAPI
    ? promisify(zlib.brotliCompress)
    : require('iltorb').compress

  const decompress = hasNativeAPI
    ? promisify(zlib.brotliDecompress)
    : require('iltorb').decompress

  return {
    compress: async data => {
      if (data === undefined) return data
      let serializedData = JSON.stringify(data)
      if (!hasNativeAPI) serializedData = Buffer.from(serializedData)
      return compress(serializedData)
    },
    decompress: async data => {
      if (data === undefined) return data
      return deserialize(await decompress(data))
    }
  }
}

module.exports = createCompress
