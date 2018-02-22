import path from 'path';

import test from 'ava';
import getPort from 'get-port';
import {
  Nuxt,
} from 'nuxt';
import request from 'request-promise-native';

test('can change options from nuxt option', async function(t) {
  const nuxt = new Nuxt({
    blog: {
      dirname: path.join(__dirname, 'posts'),
      prefix: '/posts',
    },
    modules: [ 
      '../../',
    ],
    rootDir: __dirname,
  });

  const port = await getPort();

  nuxt.listen(port, 'localhost');

  const json = await request({
    uri: `http://localhost:${port}/posts/post.md`,
  });

  let data;

  try {
    data = JSON.parse(json);
  } catch(e) {
    t.fail(e);
  }

  t.true(typeof data.meta === 'object');
  t.true(typeof data.body === 'string');

  nuxt.close();
});
