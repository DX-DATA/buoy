<template>
  <div class="main-container">
    <div class="warn-area">
      <div class="warn" v-for="warn in state.warning" :key="warn">
        <Warning :msg="warn" />
      </div>
    </div>

    <div class="info-area">
      <div class="empty"></div>
      <div class="empty2"></div>
      <div>
        <SeaInfo :data="state.seaInfo" />
      </div>
    </div>

    <div class="graph-area">
      그래프영역
      <Wave />
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import Warning from './mainComponent/Warning.vue';
import SeaInfo from './mainComponent/SeaInfo.vue';
import Wave from './wave/Wave.vue';
export default {
  components: {
    Warning,
    SeaInfo,
    Wave,
  },
  setup() {
    let state = reactive({
      warning: [
        {
          buoy: 'A',
          msg: '부표의 높이가 낮습니다.',
        },
        {
          buoy: 'B',
          msg: '부표의 무게가 용적량 한계에 도달합니다.',
        },
      ],
      seaInfo: {
        temp: 7.5,
        avg_temp: 5.5,
        salinity: 3.2,
        avg_salinity: 3.5,
      },
    });

    return { state };
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.info-area {
  display: grid;
  grid-template-columns: 0.6fr 0.6fr 1fr;
}
</style>
