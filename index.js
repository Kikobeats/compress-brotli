'use strict'

const { promisify } = require('util')
const zlib = require('zlib')
const v8 = require('v8')

const hasBrotli = Boolean(zlib.brotliCompress)
const hasV8 = Boolean(v8.serialize)

const noop = {
  compress: data => data,
  decompress: data => data
}

const defaultSerializer = hasV8 ? v8.serialize : val => Buffer.from(JSON.stringify(val))
const defaultDeserializer = hasV8 ? v8.deserialize : JSON.parse

const createCompress = ({
  enable = true,
  serialize = defaultSerializer,
  deserialize = defaultDeserializer
} = {}) => {
  if (!enable) return noop

  const compress = hasBrotli ? promisify(zlib.brotliCompress) : require('iltorb').compress

  const decompress = hasBrotli ? promisify(zlib.brotliDecompress) : require('iltorb').decompress

  return {
    compress: async data => {
      if (data === undefined) return data
      let serializedData = serialize(data)
      return compress(serializedData)
    },
    decompress: async data => {
      if (data === undefined) return data
      return deserialize(await decompress(data))
    }
  }
}

module.exports = createCompress
