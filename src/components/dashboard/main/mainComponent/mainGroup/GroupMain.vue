<template>
  <div class="main-group-container">
    <div class="top_menu">
      <!-- <img class="menu-svg" src="../../../../../assets/list.svg" v-on:click="onclickMenu" /> -->
      <div class="menu"></div>
    </div>

    <hr class="head_line" />

    <div class="content">
      <div class="info-area" v-for="data in state.content" :key="data">
        <div class="title">
          <button class="area-button" v-on:click="detail(data.name.slice(0, -2), data.group_id)">
            {{ data.name }}
          </button>
        </div>

        <InfoCard v-for="(content, index) in data.data" :key="content" :data="content" :side="index % 2 == 0 ? 'left' : 'right'" />

        <div class="empty"></div>
        <div class="line"></div>
        <div></div>

        <div class="map-area">
          <MainLocation :location="data.location" />
        </div>
      </div>
    </div>

    <ListModal @setlist="setlist" v-if="state.isModal" />

    <div class="modal-wrapper fade-in" ref="modal_wrapper" v-on:click="closeModal"></div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import InfoCard from './InfoCard.vue';
import MainLocation from './MainLocation.vue';
import ListModal from '../ListModal.vue';
import { useRouter } from 'vue-router';
import { onMounted } from '@vue/runtime-core';

export default {
  components: { InfoCard, MainLocation, ListModal },
  props: {
    data: Object,
  },
  setup(props) {
    const router = useRouter();

    const modal = ref(null);
    const modal_wrapper = ref(null);

    let state = reactive({
      isModal: false,
      content: [],
    });

    function onclickMenu() {
      state.isModal = true;
      modal_wrapper.value.style.display = 'block';
    }

    function closeModal() {
      state.isModal = false;
      modal_wrapper.value.style.display = 'none';
    }

    function setlist(data) {
      state.isModal = false;
      modal_wrapper.value.style.display = 'none';
      state.content.forEach((v, i) => {
        state.content[i].name = data[i].toUpperCase() + '구역';
      });
    }

    function detail(name, group_id) {
      router.push({
        name: 'Detail',
        params: {
          name: name,
          group_id: group_id,
        },
      });
    }

    onMounted(() => {
      let data = [];

      props.data.forEach((v) => {
        let temp = {
          name: v.group_name + '구역',
          group_id: v.group_id,
          data: [
            {
              type: 'height',
              icon: 'buoy',
              description: '해수면으로부터 평균 높이',
              data: v.group_height.toFixed(2) + 'cm',
              value: v.group_height.toFixed(2),
            },
            {
              type: 'weight',
              icon: 'weight',
              description: '구역 부표 평균 무게',
              data: v.group_weight.toFixed(2) + 'kg',
              value: v.group_weight.toFixed(2),
            },
            {
              type: 'salinity',
              icon: 'etc',
              description: '평균 염분',
              data: v.group_salinity.toFixed(2) + 'psu',
              value: v.group_salinity.toFixed(2),
            },
            {
              type: 'capacity',
              icon: 'capacity',
              description: '평균 수용량',
              data: '60%',
            },
          ],
          location: {
            center: { lat: v.group_latitude, lon: v.group_longitude },
            sw: { lat: v.group_latitude, lon: v.group_longitude },
            ne: { lat: v.group_latitude, lon: v.group_longitude },
          },
        };

        data.push(temp);
      });

      if (props.data.length != 0) {
        state.content = data;
      }
    });

    return {
      state,
      onclickMenu,
      setlist,
      closeModal,
      detail,
      modal,
      modal_wrapper,
      props,
    };
  },
};
</script>

<style scoped>
.main-group-container {
  display: flex;
  flex-direction: column;
}

.top_menu {
  display: flex;
  justify-content: flex-end;
}

.menu-svg {
  width: 48px;
  cursor: pointer;
}

.area-button {
  background: #748bde;
  border: none;
  border-radius: 20px;
  width: 160px;
  height: 70px;
  color: white;
  font-weight: bold;
  font-size: 24px;
  font-family: 'GmarketSansMedium';
  cursor: pointer;
}

.head_line {
  margin: 5px 0px 24px 0px;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  row-gap: 40px;
}

.empty {
  height: 50px;
}

.info-area {
  display: grid;
  column-gap: 30px;
  grid-template-columns: 1fr 0.01fr 1fr;
  border-radius: 15px;
  padding: 10px 20px 20px 20px;
}

.map-area {
  grid-column: 1 / 4;
}

.title {
  grid-column: 1 / 4;
  display: flex;
  justify-content: center;
}

.modal-wrapper {
  display: none;
  z-index: 101;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: rgb(0, 0, 0, 0.5);
}

.line {
  margin: 0 auto;
  width: 1px;
  background: #748bde;
  border: 4px solid #748bde;
}

.menu {
  height: 50px;
}

/* anim */

.slide-in-fwd-center {
  -webkit-animation: slide-in-fwd-center 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-fwd-center 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.scale-up-center {
  -webkit-animation: scale-up-center 0.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: scale-up-center 0.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
/* ----------------------------------------------
 * Generated by Animista on 2022-3-29 14:47:0
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation scale-up-center
 * ----------------------------------------
 */
@-webkit-keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

/* ----------------------------------------------
 * Generated by Animista on 2022-3-28 16:22:26
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation slide-in-fwd-center
 * ----------------------------------------
 */
@-webkit-keyframes slide-in-fwd-center {
  0% {
    -webkit-transform: translateZ(-1400px);
    transform: translateZ(-1400px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
}
@keyframes slide-in-fwd-center {
  0% {
    -webkit-transform: translateZ(-1400px);
    transform: translateZ(-1400px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
}

.fade-in {
  -webkit-animation: fade-in 0.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-in 0.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2022-3-29 15:39:25
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation fade-in
 * ----------------------------------------
 */
@-webkit-keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
