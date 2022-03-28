<template>
  <div class="generalInfo-container">
    <div class="cast item">현재 날씨 {{ props.data.cast }}</div>
    <div class="temp item">현재 기온 {{ props.data.temperature }}</div>
    <div class="wind item">현재 풍속 {{ props.data.wind }}</div>
    <div class="wave item">조류 속도 {{ props.data.wave_velocity }}</div>
  </div>
</template>

<script>
// import { reactive } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
export default {
  props: {
    data: Object,
  },
  setup(props) {
    onMounted(() => {});

    return { props };
  },
};
</script>

<style scoped>
.generalInfo-container {
  width: 100%;
  grid-template-columns: 0.9fr 1fr;
  padding: 32px 0px 32px 0px;
  height: 220px;
  display: grid;
  background: #f8f8f8;
  border: 1px solid #cbcbcb;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
}

.temp {
  font-family: 'GmarketSansMedium';
  font-weight: bold;
  font-size: 36px;
  border-right: 2px solid #d8d8d8;
}

.avg-temp {
  font-family: 'GmarketSansMedium';
  font-weight: bold;
  font-size: 24px;
  color: #8d8682;
}

.salinity {
  font-family: 'GmarketSansMedium';
  color: #6b6c92;
  font-weight: bold;
  font-size: 36px;
  border-right: 2px solid #d8d8d8;
}

.avg-salinity {
  font-family: 'GmarketSansMedium';
  font-weight: bold;
  font-size: 24px;
  color: #8d8682;
}

.plus {
  color: #e05e35;
}

.minus {
  color: #7ebaf1;
}
</style>
