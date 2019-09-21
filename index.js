'use strict'

const { promisify } = require('util')
const zlib = require('zlib')

const hasNativeAPI = Boolean(zlib.brotliCompress)

const defaultSerialize = val => Buffer.from(JSON.stringify(val))
const defaultDeserialize = JSON.parse

const noop = {
  deserialize: defaultDeserialize,
  serialize: defaultSerialize,
  decompress: data => data,
  compress: data => data
}

const createCompress = ({
  enable = true,
  serialize = defaultSerialize,
  deserialize = defaultDeserialize,
  iltorb = () => require('iltorb')
} = {}) => {
  if (!enable) return noop

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
