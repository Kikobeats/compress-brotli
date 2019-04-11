'use strict'

const createCompress = require('..')
const test = require('ava')

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
