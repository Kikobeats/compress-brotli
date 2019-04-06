# compress-brotli

![Last version](https://img.shields.io/github/tag/Kikobeats/compress-brotli.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/Kikobeats/compress-brotli/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/compress-brotli)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/compress-brotli.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/compress-brotli)
[![Dependency status](https://img.shields.io/david/Kikobeats/compress-brotli.svg?style=flat-square)](https://david-dm.org/Kikobeats/compress-brotli)
[![Dev Dependencies Status](https://img.shields.io/david/dev/Kikobeats/compress-brotli.svg?style=flat-square)](https://david-dm.org/Kikobeats/compress-brotli#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/compress-brotli.svg?style=flat-square)](https://www.npmjs.org/package/compress-brotli)

> Simple cross Node.js inteface for using brotli compression

## Highlights

* No dependencies.
* Handle edge cases (such as try to compress `undefined`).
* JSON serialization/deserialization by default.
* Auto detect Node.js brotli API (`>=11.7.0`).

## Install

```bash
$ npm install compress-brotli --save
```

In case you are not targeting Node.js v11.7.0 or above, you need to install `iltorb` as extra dependency:

```bash
$ npm install iltorb --save
```


## Usage

```js
const createCompress = require('compress-brotli')

// It exposes compress/decompress methods
const { compress, decompress } = createCompress()
```

## API

### compressBrotli([options])

#### enable

Type: `boolean`<br>
Default: `false`

If pass disable, it will return a noop compress/decompress methods.

#### serialize

Type: `function`<br>
Default: `JSON.stringify`

It determines the serialize method to use before compress the data.

#### deserialize

Type: `function`<br>
Default: `JSON.parse`

It determines the deserialize method to use after decompress the data.

## License

**compress-brotli** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/compress-brotli/blob/master/LICENSE.md) License.<br>
Authored and maintained by Kiko Beats with help from [contributors](https://github.com/Kikobeats/compress-brotli/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
