<template>
  <div class="detail-list">
    <div class="item" v-for="name in state.name" :key="name" v-on:click="emitBouy(name)">{{ name }} 구역</div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
export default {
  setup(props, context) {
    let state = reactive({
      name: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
    });

    function emitBouy(name) {
      context.emit('setBouy', name);
    }

    return { state, emitBouy };
  },
};
</script>

<style scoped>
.detail-list {
  display: grid;
  padding: 48px 48px 0px 48px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;
}

.item {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
  border: 1px solid #cbcbcb;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(178, 178, 207, 0.44);
  border-radius: 10px;

  font-weight: bold;
  font-size: 38px;
  font-family: 'GmarketSansMedium';
  cursor: pointer;
}
</style>
