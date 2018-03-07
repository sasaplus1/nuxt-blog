<template>
  <section v-html="body" />
</template>

<script>
  import axios from 'axios';

  export default {
    async asyncData(context) {
      const {
        data,
      } = await axios.get('http://localhost:3000/api/index.md');

      return data;
    },
  }
</script>

<style scoped>
  section {
    & >>> h1:first-of-type {
      margin-top: 0;
    }
    & >>> h2 {
      border-left: 4px solid #eef;
      margin-top: 40px;
      padding-left: 8px;
    }
    & >>> h3 {
    }

    & >>> pre {
      background-color: #eef;
      border-radius: 3px;
      overflow: scroll;
      padding: 8px;
    }

    & >>> code {
      color: #000;
      font-family: Inconsolata, Consolas, Menlo, Monaco, "MigMix 1m", "migmix-1m", monospace;
    }

    & >>> p > code {
      background-color: #eef;
      border-radius: 3px;
      padding: 4px;
    }
  }
</style>
