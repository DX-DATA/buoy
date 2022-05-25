<template>
  <div class="generalInfo-container">
    <div class="cast item">
      <img class="icon" style="width: 120px" :src="getSrc()" />
      <div class="text">
        <div class="text-top">현재날씨</div>
        <div class="text-bottom">{{ props.data.cast_msg }}<span style="font-size: 24px"></span></div>
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
      <img style="width: 120px; margin: 0 auto" :src="require('../../../../assets/wind.svg')" />
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
import { reactive } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
export default {
  props: {
    data: Object,
  },
  setup(props) {
    let state = reactive({
      cast_svg: '',
    });

    onMounted(() => {
      if (props.data.cast != '') {
        state.cast_svg = require(`../../../../assets/cast/${props.data.cast}.svg`);
      }
    });

    function getSrc() {
      if (props.data.cast != '') {
        return require(`../../../../assets/cast/${props.data.cast}.svg`);
      }
    }

    return { props, state, getSrc };
  },
};
</script>

<style scoped>
.generalInfo-container {
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  padding: 12px 10px 12px 10px;
  height: 280px;
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
  width: 120px;
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

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
}
.loader {
  color: #ffffff;
  font-size: 11px;
  text-indent: -99999em;
  margin: 55px auto;
  position: relative;
  width: 10em;
  height: 10em;
  box-shadow: inset 0 0 0 1em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.loader:before,
.loader:after {
  position: absolute;
  content: '';
}
.loader:before {
  width: 5.2em;
  height: 10.2em;
  background: #0dc5c1;
  border-radius: 10.2em 0 0 10.2em;
  top: -0.1em;
  left: -0.1em;
  -webkit-transform-origin: 5.1em 5.1em;
  transform-origin: 5.1em 5.1em;
  -webkit-animation: load2 2s infinite ease 1.5s;
  animation: load2 2s infinite ease 1.5s;
}
.loader:after {
  width: 5.2em;
  height: 10.2em;
  background: #0dc5c1;
  border-radius: 0 10.2em 10.2em 0;
  top: -0.1em;
  left: 4.9em;
  -webkit-transform-origin: 0.1em 5.1em;
  transform-origin: 0.1em 5.1em;
  -webkit-animation: load2 2s infinite ease;
  animation: load2 2s infinite ease;
}
@-webkit-keyframes load2 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load2 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
