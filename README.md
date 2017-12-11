# nuxt-blog

[![Build Status](https://travis-ci.org/sasaplus1/nuxt-blog.svg)](https://travis-ci.org/sasaplus1/nuxt-blog)
[![Dependency Status](https://gemnasium.com/sasaplus1/nuxt-blog.svg)](https://gemnasium.com/sasaplus1/nuxt-blog)
[![NPM version](https://badge.fury.io/js/nuxt-blog.svg)](http://badge.fury.io/js/nuxt-blog)

blog module for [nuxt](https://nuxtjs.org/)

## Installation

```console
$ npm install nuxt-blog
```

if you don't want to install optional modules, execute below:

```console
$ npm install --no-optional nuxt-blog
```

## Setup

## Options

how to set options:

```js
module.exports = {
  modules: [
    [
      'nuxt-blog', {
        // nuxt-blog options...
      },
    ],
  ],
};
```

or

```js
module.exports = {
  modules: [
    'nuxt-blog',
  ],
  blog: {
    // nuxt-blog options...
  },
};
```

more details: [Modules](https://nuxtjs.org/guide/modules)

### dirname

**required**

type: `string`

post's directory path.

### markdown.options

type: `Object`

options for [markdown-it](https://www.npmjs.com/package/markdown-it).

### markdown.parser

type: `Function`

Markdown parser function.

it option is higher priority than `markdown.options`.

if it is set, `markdown.options` not pass to Markdown parser.

### prefix

type: `string`

default: `/api`

prefix for URL of API.

## Debug

nuxt-blog uses [debug](https://www.npmjs.com/package/debug) in internal.

output debug info, set `nuxt:blog` and/or `nuxt:blog:utils` to `DEBUG` environment variable.

```console
$ DEBUG=nuxt:blog,nuxt:blog:utils ./node_modules/.bin/nuxt start
```

## License

The MIT license.
