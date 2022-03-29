<template>
  <div class="header">{{ state.header }}</div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { useStore } from 'vuex';
import { watch } from '@vue/runtime-core';
export default {
  setup() {
    let store = useStore();

    let state = reactive({
      header: store.getters.header,
    });

    watch(
      () => store.getters.header,
      function () {
        state.header = store.getters.header;
      }
    );

    return { state };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: flex-end;
  height: 100px;
  border-bottom: 1px solid #b3b3b3;
  font-size: 42px;
  font-weight: bold;
  font-family: 'GmarketSansMedium';
}
</style>
