'use strict'

const {
  constants: {
    BROTLI_PARAM_QUALITY,
    BROTLI_MIN_QUALITY,
    BROTLI_MODE_TEXT,
    BROTLI_PARAM_MODE
  }
} = require('zlib')

const test = require('ava')

const mergeOptions = require('../src/merge-options')

test('should skip empty inputs', t => {
  t.deepEqual(mergeOptions(), {})
})

test('should skip first empty inputs', t => {
  const options = { flush: 0 }
  t.deepEqual(mergeOptions(undefined, options), options)
})

test('should skip second empty inputs', t => {
  const options = { flush: 0 }
  t.deepEqual(mergeOptions(options), options)
})

test('should override plain options', t => {
  const options1 = { flush: 0, finishFlush: 1 }
  const options2 = { chunkSize: 1024, finishFlush: 2 }
  t.deepEqual(mergeOptions(options1, options2), { ...options1, ...options2 })
})

test('should deep merge params', t => {
  const options1 = {
    params: {
      [BROTLI_PARAM_QUALITY]: 7,
      [BROTLI_MIN_QUALITY]: 1
    }
  }
  const options2 = {
    params: {
      [BROTLI_PARAM_MODE]: BROTLI_MODE_TEXT,
      [BROTLI_MIN_QUALITY]: 5
    }
  }

  t.deepEqual(mergeOptions(options1, options2), {
    params: {
      ...options1.params,
      ...options2.params
    }
  })
})
