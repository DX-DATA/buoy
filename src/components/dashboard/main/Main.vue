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
import axios from 'axios';
import { onMounted } from '@vue/runtime-core';
import { dfs_xy_conv } from '@/functions';

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
        wave_velocity: '',
        wind: '',
        cast: 'rainy', //날씨
        temperature: '',
      },
      seaInfo: {
        temp: '',
        avg_temp: 5.5,
        salinity: '',
        avg_salinity: 3.5,
        waveHeight: '',
      },
    });

    onMounted(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        let query = `latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`;

        axios
          .get('http://localhost:3124/main/data?' + query)
          .then((response) => {
            let data = response.data;

            state.generalInfo.wave_velocity = data.tidal.current_speed;
            state.generalInfo.wind = data.obs_data.wind_speed;
            state.generalInfo.temperature = data.obs_data.air_temp;

            state.seaInfo.temp = data.obs_data.water_temp;
            // state.seaInfo.avg_temp = data.
            state.seaInfo.salinity = data.obs_data.Salinity;
            // state.seaInfo.avg_salinity = data.
            state.seaInfo.waveHeight = data.wave_hight.wave_height;
          })
          .catch((e) => {
            console.log(e);
          });
      });
    });

    function getLocation() {
      // LCC DFS 좌표변환 ( code : "toXY"(위경도->좌표, v1:위도, v2:경도), "toLL"(좌표->위경도,v1:x, v2:y) )

      let rs = dfs_xy_conv('toXY', 34.7973052, 128.4642589);
      console.log('위치', rs);
    }

    getLocation();

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
