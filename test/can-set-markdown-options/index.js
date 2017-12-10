import path from 'path';

import test from 'ava';
import getPort from 'get-port';
import {
  Nuxt,
} from 'nuxt';
import request from 'request-promise-native';

test('can set markdown options', async function(t) {
  const nuxt = new Nuxt({
    modules: [ 
      [
        '../../', {
          dirname: path.join(__dirname, 'posts'),
          markdown: {
            options: {
              html: false,
            },
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
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  let data;

  try {
    data = JSON.parse(json);
  } catch(e) {
    t.fail(e);
  }

  t.true(data.body === '<p>&lt;br /&gt;</p>\n');

  nuxt.close();
});
