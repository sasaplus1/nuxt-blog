---
---
# nuxt-blog

[![Build Status](https://travis-ci.org/sasaplus1/nuxt-blog.svg)](https://travis-ci.org/sasaplus1/nuxt-blog)
[![Dependency Status](https://gemnasium.com/sasaplus1/nuxt-blog.svg)](https://gemnasium.com/sasaplus1/nuxt-blog)
[![NPM version](https://badge.fury.io/js/nuxt-blog.svg)](http://badge.fury.io/js/nuxt-blog)
[![Try nuxt-blog on RunKit](https://badge.runkitcdn.com/nuxt-blog.svg)](https://npm.runkit.com/nuxt-blog)

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

### nuxt.config.js

```js
const path = require('path');

module.exports = {
  modules: [
    [
      'nuxt-blog', {
        dirname: path.join(__dirname, 'posts'),
      },
    ],
  ],
};
```

### pages/\_yyyy/\_mm/\_dd/\_no.vue

```html
<template>
  <div>
    <h1>{{ title }}</h1>
    <div>{{ body }}</div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    async asyncData(context) {
      const {
        route,
      } = context;

      return JSON.parse(
        await axios.get(`/api/${route.fullPath}`)
      );
    },
  }
</script>
```

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

**required option**

type: `string`

post's directory path.

### markdown.options

type: `Object`

default: syntax highlight with [highlight.js](https://www.npmjs.com/package/highlight.js)

options for [markdown-it](https://www.npmjs.com/package/markdown-it).

if `markdown.parser` is set, this option is ignore.

default value can get from `require('nuxt-blog/utils').getDefaultMarkdownOptions()`.

#### example

```js
{
  markdown: {
    options: {
      linkify: true,
      typographer: true,
    },
  },
}
```

### markdown.parser

type: `Function`

default: commonmark mode's markdown-it with highlight.js

Markdown parser function.

this option is higher priority than `markdown.options`.

if it is set, `markdown.options` not pass to Markdown parser.

default value can get from `require('nuxt-blog/utils').getDefaultMarkdownParser()`.

#### example

if you want to use [marked](https://github.com/markedjs/marked):

```js
{
  markdown: {
    parser: require('marked'),
  },
}
```

### prefix

type: `string`

default: `/api`

API URL prefix.

## Debug

nuxt-blog uses [debug](https://www.npmjs.com/package/debug) in internal.

output debug info, set `nuxt:blog` and/or `nuxt:blog:utils` to `DEBUG` environment variable.

```console
$ DEBUG=nuxt:blog,nuxt:blog:utils ./node_modules/.bin/nuxt start
```

## License

The MIT license.
