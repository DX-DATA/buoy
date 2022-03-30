<template>
  <div class="main-group-container">
    <div class="top_menu">
      <img
        class="menu-svg"
        src="../../../../../assets/list.svg"
        v-on:click="onclickMenu"
      />
    </div>

    <hr class="head_line" />

    <div class="content">
      <div class="info-area" v-for="data in state.content" :key="data">
        <div class="title">
          <button
            class="area-button"
            v-on:click="detail(data.name.slice(0, 1))"
          >
            {{ data.name }}
          </button>
        </div>

        <InfoCard :data="data.data[0]" />
        <div class="line"><div class="circle"></div></div>
        <div class="left_message message">평균 높이입니다</div>

        <div class="right_message_wrapper">
          <div class="right_message message warn-text">주의 하셔야 해요</div>
        </div>
        <div class="line"><div class="circle"></div></div>
        <InfoCard :data="data.data[1]" />

        <InfoCard :data="data.data[2]" />
        <div class="line"><div class="circle"></div></div>
        <div class="left_message message">평균 값입니다</div>

        <div class="empty"></div>
        <div class="line"></div>
        <div></div>

        <div class="map-area">
          <MainLocation />
        </div>
      </div>
    </div>

    <ListModal @setlist="setlist" v-if="state.isModal" />

    <div
      class="modal-wrapper fade-in"
      ref="modal_wrapper"
      v-on:click="closeModal"
    ></div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import InfoCard from './InfoCard.vue';
import MainLocation from './MainLocation.vue';
import ListModal from '../ListModal.vue';
import { useRouter } from 'vue-router';

export default {
  components: { InfoCard, MainLocation, ListModal },

  setup() {
    const router = useRouter();

    const modal = ref(null);
    const modal_wrapper = ref(null);

    let state = reactive({
      isModal: false,
      content: [
        {
          name: 'A구역',
          data: [
            {
              icon: 'buoy',
              description: '해수면으로부터 평균 높이',
              data: '40cm',
            },
            {
              icon: 'weight',
              description: '구역 부표 평균 무게',
              data: '30kg',
            },
            {
              icon: 'etc',
              description: '그외 다른 정보',
              data: '40cm',
            },
          ],
        },
        {
          name: 'B구역',
          data: [
            {
              icon: 'buoy',
              description: '해수면으로부터 평균 높이',
              data: '20cm',
            },
            {
              icon: 'weight',
              description: '구역 부표 평균 무게',
              data: '60kg',
            },
            {
              icon: 'etc',
              description: '그외 다른 정보',
              data: '20cm',
            },
          ],
        },
      ],
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
      console.log(data);
      state.content.forEach((v, i) => {
        state.content[i].name = data[i].toUpperCase() + '구역';
      });
    }

    function detail(name) {
      router.push({
        name: 'Detail',
        params: {
          name: name,
        },
      });
    }

    return {
      state,
      onclickMenu,
      setlist,
      closeModal,
      detail,
      modal,
      modal_wrapper,
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

.line {
  margin: 0 auto;
  width: 1px;
  background: #748bde;
  border: 4px solid #748bde;
}

.circle {
  border-radius: 100px;
  border: 18px solid #748bde;
  margin-top: 50px;
  margin-left: -17.5px;
}

.message {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  font-family: 'GmarketSansMedium';
}

.left_message {
  position: relative;
  margin: 50px 0px 30px 10px;
  width: 200px;
  height: 50px;
  background: white;
  border-radius: 60px;
}

.left_message:after {
  border-top: 15px solid white;
  border-left: 15px solid transparent;
  border-right: 0px solid transparent;
  border-bottom: 0px solid transparent;
  content: '';
  position: absolute;
  top: 15px;
  left: -14px;
}

.right_message_wrapper {
  display: flex;
  justify-content: flex-end;
  padding-right: 15px;
}

.right_message {
  position: relative;
  margin: 50px 0px 30px 25px;
  width: 200px;
  height: 50px;
  background: white;
  border-radius: 60px;
}

.right_message:after {
  border-top: 15px solid rgb(255, 200, 30);
  border-left: 0px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 0px solid transparent;
  content: '';
  position: absolute;
  top: 15px;
  left: 199px;
}

.warn-text {
  background: rgb(255, 200, 30);
  color: black;
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

/* anim */

.slide-in-fwd-center {
  -webkit-animation: slide-in-fwd-center 0.4s
    cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-fwd-center 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.scale-up-center {
  -webkit-animation: scale-up-center 0.2s cubic-bezier(0.39, 0.575, 0.565, 1)
    both;
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
