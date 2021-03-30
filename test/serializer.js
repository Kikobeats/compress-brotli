'use strict'

const test = require('ava')

const JSONB = require('..')

function clone (o) {
  return JSON.parse(JSON.stringify(o))
}

const fixtures = {
  notBuffers: { foo: 'bar', baz: 5, removeMe: undefined, boing: null },
  valid: [
    {
      obj: Buffer.from('hello'),
      str: '{"type":"Buffer","data":"base64:aGVsbG8="}'
    },
    {
      obj: Buffer.from('☃ ★ ☺ ♤ ✓ ♛ ∭'),
      str:
        '{"type":"Buffer","data":"base64:4piDIOKYhSDimLog4pmkIOKckyDimZsg4oit"}'
    },
    { obj: Buffer.from(''), str: '{"type":"Buffer","data":""}' },
    {
      obj: Buffer.from('🌈'),
      str: '{"type":"Buffer","data":"base64:8J+MiA=="}'
    },
    {
      obj: { buf: Buffer.from('🌈'), test: 'yep' },
      str: '{"buf":{"type":"Buffer","data":"base64:8J+MiA=="},"test":"yep"}'
    }
  ],
  utf8: [
    {
      obj: { foo: Buffer.from('🌈') },
      str: '{"foo":{"type":"Buffer","data":"🌈"}}'
    }
  ],
  invalid: [
    { type: 'Buffer' },
    { type: 'Buffer', data: 500 },
    { type: 'Buffer', whatever: [123, 124, 125] }
  ]
}

const examples = {
  simple: { foo: [], bar: {}, baz: Buffer.from('some binary data') },
  just_buffer: Buffer.from('JUST A BUFFER'),
  all_types: {
    string: 'hello',
    number: 3145,
    null: null,
    object: {},
    array: [],
    boolean: true,
    boolean2: false
  },
  foo: Buffer.from('foo'),
  foo2: Buffer.from('foo2'),
  escape: {
    buffer: Buffer.from('x'),
    string: JSONB.stringify(Buffer.from('x'))
  },
  escape2: {
    buffer: Buffer.from('x'),
    string: ':base64:' + Buffer.from('x').toString('base64')
  },
  undefined: {
    empty: undefined,
    test: true
  },
  undefined2: {
    first: 1,
    empty: undefined,
    test: true
  },
  undefinedArray: {
    array: [undefined, 1, 'two']
  },
  fn: {
    fn: function () {}
  },
  undefined3: undefined
}

for (const key in examples) {
  test(key, t => {
    const value = examples[key]
    const stringified = JSONB.stringify(value)

    if (JSON.stringify(value) === undefined) {
      t.is(stringified, undefined)
    } else {
      const parsed = JSONB.parse(stringified)
      t.deepEqual(clone(value), clone(parsed))
    }
  })
}

test("don't touch anything other than buffers", t => {
  t.deepEqual(
    JSONB.stringify(fixtures.notBuffers),
    JSON.stringify(fixtures.notBuffers)
  )
})

test.skip('buffers encoded/decoded as expected', t => {
  for (const test of fixtures.valid) {
    t.deepEqual(JSONB.stringify(test.obj), test.str)
    t.deepEqual(JSONB.parse(test.str), test.obj)
    t.deepEqual(JSONB.parse(JSONB.stringify(test.obj)), test.obj)
    t.deepEqual(JSONB.parse(JSON.stringify(test.obj)), test.obj)
  }
})

test.skip('utf8', t => {
  for (const test of fixtures.utf8) {
    t.deepEqual(JSONB.parse(test.str), test.obj)
  }
})

test('not actually a buffer', t => {
  for (const obj of fixtures.invalid) {
    const str = JSON.stringify(obj)
    t.deepEqual(JSONB.parse(str), obj)
  }
})
