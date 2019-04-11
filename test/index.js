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
