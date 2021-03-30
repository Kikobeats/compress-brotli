# compress-brotli

![Last version](https://img.shields.io/github/tag/Kikobeats/compress-brotli.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/Kikobeats/compress-brotli/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/compress-brotli)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/compress-brotli.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/compress-brotli)
[![Dependency status](https://img.shields.io/david/Kikobeats/compress-brotli.svg?style=flat-square)](https://david-dm.org/Kikobeats/compress-brotli)
[![Dev Dependencies Status](https://img.shields.io/david/dev/Kikobeats/compress-brotli.svg?style=flat-square)](https://david-dm.org/Kikobeats/compress-brotli#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/compress-brotli.svg?style=flat-square)](https://www.npmjs.org/package/compress-brotli)

> Compress/Decompress using Brotli in a simple way.

## Highlights

- Handle edge cases (such as try to compress `undefined`).
- JSON serialization/deserialization with Buffer support by default.
- Easy tu customize (e.g., using [v8 serialization](https://nodejs.org/api/v8.html#v8_v8_serialize_value)).

## Install

```bash
$ npm install compress-brotli --save
```

## Usage

```js
const createCompress = require('compress-brotli')

// It exposes compress/decompress methods
const { compress, decompress } = createCompress()
```

using [v8 serialization](https://nodejs.org/api/v8.html#v8_v8_serialize_value):

```js
const createCompress = require('compress-brotli')
const v8 = require('v8')

const { compress, decompress } = createCompress({
  serialize: v8.serialize,
  deserialize: v8.deserialize
})
```

## API

### compressBrotli([options])

#### enable

Type: `boolean`<br>
Default: `false`

If pass disable, it will return a noop compress/decompress methods.

#### serialize

Type: `function`<br>
Default: `JSONB.stringify`

It determines the serialize method to use before compress the data.

#### deserialize

Type: `function`<br>
Default: `JSONB.parse`

It determines the deserialize method to use after decompress the data.

## License

**compress-brotli** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/compress-brotli/blob/master/LICENSE.md) License.<br>
Authored and maintained by Kiko Beats with help from [contributors](https://github.com/Kikobeats/compress-brotli/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
