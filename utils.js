const debug = require('debug')('nuxt:blog:utils');

let hljs;
let markdownIt;

try {
  // NOTE: optional dependencies
  hljs = require('highlight.js');
} catch(e) {
  debug(e);
}

try {
  // NOTE: optional dependencies
  markdownIt = require('markdown-it');
} catch(e) {
  debug(e);
}

/**
 * highlight code block
 *
 * @param {string} str
 * @param {string} lang
 * @return {string}
 */
function highlighter(str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value;
    } catch(e) {
      debug(e);
    }
  }

  return '';
}

/**
 * get default markdown options object
 *
 * @return {Object}
 */
function getDefaultMarkdownOptions() {
  if (!hljs) {
    // eslint-disable-next-line no-console
    console.warn('cannot require highlight.js');
  }

  return (hljs) ? { highlight: highlighter } : {};
}

/**
 * get default markdown parser instance
 *
 * @param {Object} [options=null]
 * @return {Function?}
 */
function getDefaultMarkdownParser(options = null) {
  if (!markdownIt) {
    // eslint-disable-next-line no-console
    console.warn('cannot require markdown-it');

    return null;
  }

  const parser = markdownIt(
    'commonmark', options || getDefaultMarkdownOptions()
  );

  return parser.render.bind(parser);
}

module.exports = {
  getDefaultMarkdownOptions,
  getDefaultMarkdownParser,
};
