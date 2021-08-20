'use strict'

const test = require('ava')
const zlib = require('zlib')

const {
  constants: {
    BROTLI_OPERATION_PROCESS,
    BROTLI_MODE_TEXT,
    BROTLI_PARAM_MODE,
    BROTLI_PARAM_QUALITY
  }
} = zlib

const { spy } = require('sinon')

test.before(t => {
  t.context.brotliCompress = spy(zlib, 'brotliCompress')
  t.context.brotliDecompress = spy(zlib, 'brotliDecompress')
})

test.after.always(t => {
  t.context.brotliCompress.restore()
  t.context.brotliDecompress.restore()
})

const resetModuleCache = (modulePath) => {
  delete require.cache[require.resolve(modulePath)]
}

const requireNonCached = (modulePath) => {
  resetModuleCache(modulePath)
  const module = require(modulePath)
  resetModuleCache(modulePath)
  return module
}

test.beforeEach('use createCompress with spy on brotliCompress', t => {
  t.context.createCompress = requireNonCached('..')
})

const operationCycleMacro = (t, operationName, invocationOption, callLevelOptions, factoryLevelOptions) => {
  const {
    createCompress,
    [`brotli${operationName}`]: brotliOperation
  } = t.context
  const { [operationName.toLowerCase()]: operation } = createCompress({
    [`${operationName.toLowerCase()}Options`]: factoryLevelOptions
  })
  const data = 'whatever'

  const prevCallCount = brotliOperation.callCount

  operation(data, callLevelOptions)

  t.is(brotliOperation.callCount, prevCallCount + 1)
  t.deepEqual(brotliOperation.lastCall.args[1], invocationOption)
}
operationCycleMacro.title = (caseTitle = '', operationName) => `${caseTitle} to ${operationName.toLowerCase()}`.trim();

['Compress', 'Decompress'].forEach(
  operationName => {
    test('by default should provide no options',
      operationCycleMacro,
      operationName,
      {}
    )

    test('should bypass call level options',
      operationCycleMacro,
      operationName,
      {
        chunkSize: 1024
      },
      {
        chunkSize: 1024
      }
    )

    test('should bypass factory level options',
      operationCycleMacro,
      operationName,
      {
        chunkSize: 1024
      },
      undefined,
      {
        chunkSize: 1024
      }
    )

    test('should merge call-into-factory level options',
      operationCycleMacro,
      operationName,
      {
        flush: BROTLI_OPERATION_PROCESS,
        chunkSize: 2048
      },
      {
        chunkSize: 2048
      },
      {
        flush: BROTLI_OPERATION_PROCESS,
        chunkSize: 1024
      }
    )

    test('should deep merge call-into-factory level option.parameters',
      operationCycleMacro,
      operationName,
      {
        params: {
          [BROTLI_PARAM_MODE]: BROTLI_MODE_TEXT,
          [BROTLI_PARAM_QUALITY]: 4
        }
      },
      {
        params: {
          [BROTLI_PARAM_QUALITY]: 4
        }
      },
      {
        params: {
          [BROTLI_PARAM_MODE]: BROTLI_MODE_TEXT,
          [BROTLI_PARAM_QUALITY]: 11
        }
      }
    )
  }
)
