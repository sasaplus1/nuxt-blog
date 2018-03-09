import test from 'ava';
import blog from '../../';

test('export some values', function(t) {
  t.true(typeof blog !== 'undefined');
  t.true(typeof blog.meta !== 'undefined');
  t.true(typeof blog.getDefaultMarkdownOptions !== 'undefined');
  t.true(typeof blog.getDefaultMarkdownParser !== 'undefined');
});
