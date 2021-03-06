import path from 'path';

import test from 'ava';
import getPort from 'get-port';
import {
  Nuxt,
} from 'nuxt';
import request from 'request-promise-native';

test('can change URI prefix', async function(t) {
  const nuxt = new Nuxt({
    modules: [ 
      [
        '../../', {
          dirname: path.join(__dirname, 'posts'),
          prefix: '/posts',
        },
      ],
    ],
    rootDir: __dirname,
  });

  const port = await getPort();

  await nuxt.listen(port, 'localhost');

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

  await nuxt.close();
});
