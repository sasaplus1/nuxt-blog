<template>
  <div :class="$style.default">
    <nuxt />
    <page-footer :class="$style.footer" />
  </div>
</template>

<script>
  import PageFooter from '@/components/page-footer.vue';

  export default {
    components: {
      'page-footer': PageFooter,
    },
  }
</script>

<style>
  body {
    margin: 0;
  }
</style>

<style module>
  .default {
    color: #444;
    font-family: Arial, sans-serif;
    margin: 40px auto 0 auto;
    width: 600px;

    & a:link,
    & a:visited {
      color: #99f;
      text-decoration: none;
    }

    & a:hover {
      text-decoration: underline;
    }
  }

  .footer {
    color: #666;
    margin: 40px 0;
  }
</style>
