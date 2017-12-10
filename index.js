const fs = require('fs');
const path = require('path');
const util = require('util');

const debug = require('debug')('nuxt:blog');
const frontMatter = require('front-matter');
const get = require('lodash.get');

const utils = require('./utils');

const readFile = util.promisify(fs.readFile);

const {
  getDefaultMarkdownParser,
} = utils;

/**
 * middleware
 *
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @return {Promise}
 */
async function middleware(req, res) {
  const {
    dirname,
    markdownParser,
    prefix,
  } = this;

  debug('dirname', dirname);
  debug('markdownParser === null', markdownParser === null);
  debug('prefix', prefix);

  debug('req.url', req.url);

  const xRequestedWith = req.headers['x-requested-with'];

  debug('X-Requested-With', xRequestedWith);

  if (!/^XMLHttpRequest$/i.test(xRequestedWith)) {
    res.writeHead(403);
    res.end('Forbidden');

    return;
  }

  const filename =
    (/\/$/.test(req.url)) ?
    path.join(dirname, req.url, 'index.md') :
    path.join(dirname, req.url);

  debug('filename', filename);

  const data = await readFile(filename, 'utf8').catch(function(err) {
    debug('fs.readFile error', err);

    res.writeHead(404);
    res.end('Not found');
  });

  debug('data', data);

  if (res.finished) {
    return;
  }

  const content = frontMatter(data);

  debug('content', content);

  res.writeHead(200, {
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(
    JSON.stringify({
      meta: content.attributes,
      body: markdownParser(content.body),
    })
  );
}

/**
 * blog module for nuxt
 *
 * @param {Object} moduleOptions
 * @param {string} moduleOptions.dirname
 * @param {Object} moduleOptions.markdown
 * @param {Object} moduleOptions.markdown.options
 * @param {Function} moduleOptions.markdown.parser
 * @param {string} moduleOptions.prefix
 * @throws {Error}
 */
function blog(moduleOptions) {
  const mergedOptions = Object.assign({}, this.options.blog, moduleOptions);

  const {
    dirname = '',
    markdown = {},
    prefix = '/api',
  } = mergedOptions;

  const markdownOptions = get(markdown, 'options', null);
  const markdownParser = get(markdown, 'parser', null);

  debug('dirname', dirname);
  debug('prefix', prefix);
  debug('markdownOptions', markdownOptions);
  debug('markdownParser === null', markdownParser === null);

  let stat;

  try {
    stat = fs.statSync(dirname);
  } catch(e) {
    throw e;
  }

  if (!stat.isDirectory()) {
    throw new Error(`dirname must be a directory: ${dirname}`);
  }

  const resolvedPrefix = prefix.replace(/\/$/, '');

  debug('resolvedPrefix', resolvedPrefix);

  const bindedMiddleware = middleware.bind({
    dirname,
    markdownParser: markdownParser || getDefaultMarkdownParser(markdownOptions),
    prefix: resolvedPrefix,
  });

  this.addServerMiddleware({
    path: resolvedPrefix,
    handler: bindedMiddleware,
  });
}

module.exports = blog;
module.exports.meta = require('./package.json');
