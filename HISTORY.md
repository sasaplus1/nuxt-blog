# 1.0.0 / 2018-03-10

- removed checking `X-Requested-With` HTTP header
- moved util functions

need change to below:

```diff
-require('nuxt-blog/utils').getDefaultMarkdownOptions()
+require('nuxt-blog').getDefaultMarkdownOptions()
```

and

```diff
-require('nuxt-blog/utils').getDefaultMarkdownParser()
+require('nuxt-blog').getDefaultMarkdownParser()
```

# 0.1.0 / 2017-12-11

- initial release
