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
      <GroupMain :data="state.groupData" :key="state.groupData" />
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import Warning from './mainComponent/Warning.vue';
import SeaInfo from './mainComponent/SeaInfo.vue';
import GroupMain from './mainComponent/mainGroup/GroupMain.vue';
import GeneralInfo from './mainComponent/GeneralInfo.vue';
import api from '@/api/api';
import { onMounted } from '@vue/runtime-core';

export default {
  components: {
    Warning,
    SeaInfo,
    GroupMain,
    GeneralInfo,
  },
  setup() {
    let state = reactive({
      warning: [],
      generalInfo: {
        wave_velocity: '',
        wind: '',
        cast: '', //날씨
        cast_msg: '',
        temperature: '',
      },
      seaInfo: {
        temp: '',
        avg_temp: 17.2,
        salinity: '',
        avg_salinity: 30.2,
        waveHeight: '',
      },
      groupData: [],
    });

    onMounted(() => {
      getMainData();
      getGroupData();
      getWarnData();
    });

    function getMainData() {
      navigator.geolocation.getCurrentPosition(async (position) => {
        let query = `?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`;

        let data = await api._GET('main/data', query);
        state.generalInfo.wave_velocity = data.tidal.current_speed;
        state.generalInfo.wind = data.meteo_val.data.wind_velocity;
        state.generalInfo.temperature = data.meteo_val.data.temperature;

        set_sky_data(data.meteo_val.data);

        state.seaInfo.temp = data.obs_data.water_temp;
        // state.seaInfo.avg_temp = data.
        state.seaInfo.salinity = data.obs_data.Salinity;
        // state.seaInfo.avg_salinity = data.
        state.seaInfo.waveHeight = data.wave_hight.wave_height;
      });
    }

    function set_sky_data(data) {
      if (data.rain_code === '0') {
        switch (data.sky) {
          case '1':
            state.generalInfo.cast = 'sunny';
            state.generalInfo.cast_msg = '맑음';
            break;
          case '3':
            state.generalInfo.cast = 'cloudy';
            state.generalInfo.cast_msg = '구름많음';
            break;
          case '4':
            state.generalInfo.cast = 'cloudy2';
            state.generalInfo.cast_msg = '흐림';
            break;
          default:
            break;
        }
      } else {
        switch (data.rain_code) {
          case '1':
            state.generalInfo.cast = 'rainy';
            state.generalInfo.cast_msg = '비';
            break;
          case '2':
            state.generalInfo.cast = 'rain_snow';
            state.generalInfo.cast_msg = '눈/비';
            break;
          case '3':
            state.generalInfo.cast = 'snow';
            state.generalInfo.cast_msg = '눈';
            break;
          case '5':
            state.generalInfo.cast = 'raindrop';
            state.generalInfo.cast_msg = '빗방울';
            break;
          case '6':
            state.generalInfo.cast = 'raindrop_blizzard';
            state.generalInfo.cast_msg = '빗방울/눈날림';
            break;
          case '7':
            state.generalInfo.cast = 'blizzard';
            state.generalInfo.cast_msg = '눈날림';
            break;
        }
      }
    }

    async function getGroupData() {
      let data = await api._GET('main/group');
      state.groupData = data;
    }

    async function getWarnData() {
      let data = await api._GET('main/warn');
      state.warning = data;
    }

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
