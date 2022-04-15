<template>
  <div class="generalInfo-container">
    <div class="cast item">
      <img class="icon" :src="require('../../../../assets/sunny.svg')" />
      <div class="text">
        <div class="text-top">현재날씨</div>
        <div class="text-bottom">맑음<span style="font-size: 24px"></span></div>
      </div>
    </div>
    <div class="temp item">
      <img class="icon" :src="require('../../../../assets/temperature.svg')" />
      <div class="text">
        <div class="text-top">온도</div>
        <div class="text-bottom">
          {{ props.data.temperature }}
          <span style="font-size: 24px">℃</span>
        </div>
      </div>
    </div>
    <div class="wind item">
      <img style="height: 64px; margin: 0 auto" :src="require('../../../../assets/wind.svg')" />
      <div class="text">
        <div class="text-top">풍속</div>
        <div class="text-bottom">{{ props.data.wind }} <span style="font-size: 24px">m/s</span></div>
      </div>
    </div>
    <div class="wave item">
      <img class="icon" :src="require('../../../../assets/wave.svg')" />
      <div class="text">
        <div class="text-top">조류속도</div>
        <div class="text-bottom">
          {{ props.data.wave_velocity }}
          <span style="font-size: 24px">cm/s</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { reactive } from '@vue/reactivity';
export default {
  props: {
    data: Object,
  },
  setup(props) {
    return { props };
  },
};
</script>

<style scoped>
.generalInfo-container {
  width: 100%;
  grid-template-columns: 1fr 1fr;
  padding: 12px 10px 12px 10px;
  height: 220px;
  gap: 5px;
  display: grid;
  background: #f8f8f8;
  border: 1px solid #cbcbcb;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
}

.icon {
  width: 84px;
  margin: 0 auto;
}

.text {
  display: flex;
  height: 85px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.text-top {
  font-family: 'GmarketSansMedium';
  font-size: 24px;
  text-align: center;

  color: #8d8682;
}

.text-bottom {
  font-family: 'GmarketSansMedium';
  font-weight: bold;
  font-size: 36px;
  text-align: center;
}

.temp2 {
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
