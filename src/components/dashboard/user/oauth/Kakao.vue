<template>
  <div>dtd</div>
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
// import api from '@/api/api';
export default {
  setup() {
    let route = useRoute();

    onMounted(async () => {});

    console.log(route.query);
  },
};
</script>

<style></style>
