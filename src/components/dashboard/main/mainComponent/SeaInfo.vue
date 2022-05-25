<template>
  <div class="seaInfo-container">
    <div class="temp item" :class="{ plus: state.info.temp >= 0, minus: state.info.temp < 0 }">수온 {{ state.info.temp }}℃</div>
    <div class="avg-temp item">
      {{ state.msg.temp_msg.first }}
      <span v-if="state.msg.temp_msg.positive > 0" style="color: #f59057"> {{ state.msg.temp_msg.temp }}</span>
      <span v-if="state.msg.temp_msg.positive < 0" style="color: #7ebaf1"> {{ state.msg.temp_msg.temp }}</span
      >{{ state.msg.temp_msg.last }}
    </div>
    <div class="salinity item">염도 {{ state.info.salinity }} psu</div>
    <div class="avg-salinity item">
      {{ state.msg.salinity_msg.first }}
      <span v-if="state.msg.salinity_msg.positive > 0" style="color: #f59057"> {{ state.msg.salinity_msg.sali_gap }}</span>
      <span v-if="state.msg.salinity_msg.positive < 0" style="color: #7ebaf1"> {{ state.msg.salinity_msg.sali_gap }}</span
      >{{ state.msg.salinity_msg.last }}
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
      info: props.data,
      msg: {
        temp_msg: {
          first: '',
          last: '',
          temp: 0,
          positive: 0,
        },
        salinity_msg: {
          first: '',
          last: '',
          sali_gap: 0,
          positive: 0,
        },
      },
    });

    onMounted(() => {
      setMessage();
    });

    function setMessage() {
      let temp_gap = state.info.temp - state.info.avg_temp;

      if (temp_gap < 0) {
        state.msg.temp_msg.first = `평균보다`;
        state.msg.temp_msg.last = ` 낮습니다.`;
        state.msg.temp_msg.temp = -temp_gap.toFixed(1) + '℃';
        state.msg.temp_msg.positive = -1;
      } else if (temp_gap == 0) {
        state.msg.temp_msg.first = `평균온도와 같습니다.`;
        state.msg.temp_msg.last = '';
      } else if (temp_gap > 0) {
        state.msg.temp_msg.first = `평균보다`;
        state.msg.temp_msg.last = ` 높습니다.`;
        state.msg.temp_msg.temp = temp_gap.toFixed(1) + '℃';
        state.msg.temp_msg.positive = 1;
      }

      let salinity_gap = state.info.salinity - state.info.avg_salinity;
      if (salinity_gap < 0) {
        state.msg.salinity_msg.first = `평균보다`;
        state.msg.salinity_msg.last = ` 낮습니다.`;
        state.msg.salinity_msg.sali_gap = -salinity_gap.toFixed(1) + 'psu';
        state.msg.salinity_msg.positive = -1;
      } else if (salinity_gap == 0) {
        state.msg.salinity_msg.first = `평균염도와 같습니다.`;
        state.msg.salinity_msg.last = '';
      } else if (salinity_gap > 0) {
        state.msg.salinity_msg.first = `평균보다`;
        state.msg.salinity_msg.last = ` 높습니다.`;
        state.msg.salinity_msg.sali_gap = salinity_gap.toFixed(1) + 'psu';
        state.msg.salinity_msg.positive = 1;
      }
    }

    return { state };
  },
};
</script>

<style scoped>
.seaInfo-container {
  width: 100%;
  grid-template-columns: 0.9fr 1fr;
  grid-template-rows: 1fr 1fr;
  padding: 32px 0px 32px 0px;
  height: 280px;
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
