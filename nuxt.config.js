const path = require('path');

module.exports = {
  modules: [
    [
      '@@', {
        dirname: path.join(__dirname, 'nuxt/posts'),
      },
    ],
  ],
  srcDir: path.join(__dirname, 'nuxt'),
};
