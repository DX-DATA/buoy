<template>
  <canvas ref="canvas" id="canvas" class="canvas">ddgdgdgdgtdt</canvas>
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import { ref } from 'vue';
export default {
  setup() {
    const canvas = ref(null);
    let ctx = ref(null);

    onMounted(() => {
      console.log(canvas.value);

      ctx = canvas.value.getContext('2d');
    });

    return { canvas, ctx };
  },
};
</script>
>

<style scoped></style>
