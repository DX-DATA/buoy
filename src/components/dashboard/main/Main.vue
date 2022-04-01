<template>
  <div class="main-container">
    <div class="warn-area">
      <div class="warn" v-for="warn in state.warning" :key="warn">
        <Warning :msg="warn" />
      </div>
    </div>

    <div class="info-area">
      <div class="">
        <GeneralInfo :data="state.generalInfo" />
      </div>
      <div class="empty2"></div>
      <div>
        <SeaInfo :data="state.seaInfo" />
      </div>
    </div>

    <div class="graph-area">
      <GroupMain />
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import Warning from './mainComponent/Warning.vue';
import SeaInfo from './mainComponent/SeaInfo.vue';
import GroupMain from './mainComponent/mainGroup/GroupMain.vue';
import GeneralInfo from './mainComponent/GeneralInfo.vue';

export default {
  components: {
    Warning,
    SeaInfo,
    GroupMain,
    GeneralInfo,
  },
  setup() {
    let state = reactive({
      warning: [
        {
          area: 'A',
          line: 2,
          warn: {
            type: 'height',
            status: 'row',
          },
        },
        {
          area: 'B',
          line: 3,
          warn: {
            type: 'weight',
            status: 'full',
          },
        },
        {
          area: 'C',
          line: 3,
          warn: {
            type: 'location',
            target: 1,
            status: 'mssing',
          },
        },
        {
          area: 'D',
          line: 7,
          warn: {
            type: 'height',
            status: 'row',
          },
        },
      ],
      generalInfo: {
        wave_velocity: 3.5,
        wind: 2.5,
        cast: 'rainy', //날씨
        temperature: 12.7,
      },
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

.warn-area {
  margin: 0px 48px 0px 48px;
}

.info-area {
  margin: 0px 48px 0px 48px;

  display: grid;
  grid-template-columns: 1fr 0.01fr 1fr;
}

.graph-area {
  padding: 0px 48px 0px 48px;

  background: #e6e7eb;
}
</style>
