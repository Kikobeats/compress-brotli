'use strict'

const { promisify } = require('util')
const zlib = require('zlib')
const JSONB = require('buffer-json')

const hasNativeAPI = Boolean(zlib.brotliCompress)
const identity = val => val

const createCompress = ({
  enable = true,
  serialize = JSONB.stringify,
  deserialize = JSONB.parse,
  iltorb = () => require('iltorb')
} = {}) => {
  if (!enable) {
    return { serialize, deserialize, decompress: identity, compress: identity }
  }

  const compress = hasNativeAPI
    ? promisify(zlib.brotliCompress)
    : iltorb().compress

  const decompress = hasNativeAPI
    ? promisify(zlib.brotliDecompress)
    : iltorb().decompress

  return {
    serialize,
    deserialize,
    compress: async data => {
      if (data === undefined) return data
      const serializedData = serialize(data)
      return compress(serializedData)
    },
    decompress: async data => {
      if (data === undefined) return data
      return deserialize(await decompress(data))
    }
  }
}

module.exports = createCompress
