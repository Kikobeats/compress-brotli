'use strict'

const test = require('ava')
const createCompress = require('..')
const v8 = require('v8')

;[
  ['null', null],
  ['undefined', undefined],
  ['empty string', ''],
  ['empty object', {}],
  ['empty array', []]
].forEach(([name, value]) => {
  test(`handle ${name}`, async t => {
    const { compress, decompress } = createCompress()
    const compressedData = await compress(value)
    const decompressedData = await decompress(compressedData)
    t.deepEqual(decompressedData, value)
  })
})

test('default serializer/deserializer supports buffer', async t => {
  const value = Buffer.from([
    0x68,
    0x65,
    0x6c,
    0x6c,
    0x6f,
    0x20,
    0x77,
    0x6f,
    0x72,
    0x6c,
    0x64
  ])
  const { compress, decompress } = createCompress()
  const compressedData = await compress(value)
  const decompressedData = await decompress(compressedData)
  t.deepEqual(decompressedData, value)
})

test('custom serializer/deserializer', async t => {
  const { compress, decompress } = createCompress({
    serialize: v8.serialize,
    deserialize: v8.deserialize
  })
  const value = { foo: 'bar', fooz: { foo: 'bar' }, arr: [1, 2, 3, 4] }
  const compressedData = await compress(value)
  const decompressedData = await decompress(compressedData)
  t.deepEqual(decompressedData, value)
})
