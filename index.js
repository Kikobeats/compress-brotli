'use strict'

const { promisify } = require('util')
const JSONB = require('json-buffer')
const zlib = require('zlib')

const compress = promisify(zlib.brotliCompress)

const decompress = promisify(zlib.brotliDecompress)

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

  return {
    serialize,
    deserialize,
    compress: async (data, ...options) => {
      if (data === undefined) return data
      const serializedData = serialize(data)
      return compress(serializedData, ...options)
    },
    decompress: async (data, ...options) => {
      if (data === undefined) return data
      return deserialize(await decompress(data, ...options))
    }
  }
}

module.exports = createCompress
module.exports.stringify = JSONB.stringify
module.exports.parse = JSONB.parse
