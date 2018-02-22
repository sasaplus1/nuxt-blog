import path from 'path';

import test from 'ava';
import getPort from 'get-port';
import {
  Nuxt,
} from 'nuxt';
import request from 'request-promise-native';

test('can set markdown parser', async function(t) {
  const nuxt = new Nuxt({
    modules: [ 
      [
        '../../', {
          dirname: path.join(__dirname, 'posts'),
          markdown: {
            parser: (s) => s,
          },
        },
      ],
    ],
    rootDir: __dirname,
  });

  const port = await getPort();

  nuxt.listen(port, 'localhost');

  const json = await request({
    uri: `http://localhost:${port}/api/post.md`,
  });

  let data;

  try {
    data = JSON.parse(json);
  } catch(e) {
    t.fail(e);
  }

  t.true(data.body === '# hello\n');

  nuxt.close();
});
