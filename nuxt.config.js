const path = require('path');

const meta = require('./package');

module.exports = {
  build: {
    extractCSS: true,
  },
  css: [
    'highlight.js/styles/github.css',
  ],
  head: {
    link: [
      { rel: 'canonical', href: 'https://sasaplus1.github.io/nuxt-blog' },
    ],
    meta: [
      { charset: 'utf-8' },
      { content: 'IE=edge', 'http-equiv': "X-UA-Compatible" },
      { content: 'width=device-width,initial-scale=1', name: 'viewport' },
      { content: 'telephone=no', name: 'format-detection' },
    ],
    title: meta.name,
  },
  loading: {
    color: '#aaf',
  },
  modules: [
    [
      '@@', {
        dirname: path.join(__dirname, 'nuxt/posts'),
      },
    ],
  ],
  srcDir: path.join(__dirname, 'nuxt'),
};
