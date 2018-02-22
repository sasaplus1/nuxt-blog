<template>
  <div v-html="body" />
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
