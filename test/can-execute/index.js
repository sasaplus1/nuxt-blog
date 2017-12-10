import path from 'path';

import test from 'ava';
import getPort from 'get-port';
import {
  Nuxt,
} from 'nuxt';

test('can execute', async function(t) {
  const nuxt = new Nuxt({
    modules: [ 
      [
        '../../', {
          dirname: path.join(__dirname, 'posts'),
        },
      ],
    ],
    rootDir: __dirname,
  });

  const port = await getPort();

  nuxt.listen(port, 'localhost');
  nuxt.close(
    () => t.pass()
  );
});
