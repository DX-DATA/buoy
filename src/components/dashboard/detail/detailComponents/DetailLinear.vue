<template>
  <div class="text">라인 {{ props.line.number }}</div>
  <div>
    <div class="linear" ref="linear">
      <div class="line" v-on:click="onClick">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle pink"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle pink"></div>
        <div class="circle"></div>
        <div class="circle pink"></div>
      </div>
      <img :src="require('@/assets/bottom_arrow.svg')" style="cursor: pointer" v-if="!state.isClicked" v-on:click="onClick" />
      <img :src="require('@/assets/top_arrow.svg')" style="cursor: pointer" v-if="state.isClicked" v-on:click="onClick" />

      <Detailinfo v-if="state.isClicked" @onclickBouyMenu="onclickBouyMenu" />

      <div class="modal-wrapper fade-in" ref="modal_wrapper" v-on:click="closeModal"></div>
    </div>

    <BouyModal v-if="state.isBouyModal" :data="state.modalData" />

    <div class="modal-wrapper fade-in" ref="modal_wrapper" v-on:click="closeModal"></div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import Detailinfo from './LinearComponents/Detail_info.vue';
import BouyModal from './LinearComponents/modal/BouyModal.vue';
import { useRoute } from 'vue-router';

export default {
  components: { Detailinfo, BouyModal },
  props: { line: Object },
  setup(props) {
    let linear = ref(null);
    const modal_wrapper = ref(null);
    const route = useRoute();

    let state = reactive({
      isClicked: false,
      isBouyModal: false,
      modalData: {},
    });

    onMounted(() => {
      if (route.params.data) {
        let data = JSON.parse(route.params.data);

        if (data.line == props.line.number) {
          console.log(window.pageYOffset + linear.value.getBoundingClientRect().top + 300);

          onClick();

          setTimeout(() => {
            window.scrollTo({ top: window.pageYOffset + linear.value.getBoundingClientRect().top, behavior: 'smooth' });
          }, 20);
        }
      }
    });

    function onClick() {
      state.isClicked = !state.isClicked;

      if (state.isClicked) {
        linear.value.appendC;
        linear.value.style.height = 'auto';
      } else {
        linear.value.style.height = '60px';
      }
    }

    function onclickBouyMenu(data) {
      state.modalData = data;
      state.isBouyModal = true;
      modal_wrapper.value.style.display = 'block';
    }

    function closeModal() {
      state.isBouyModal = false;
      modal_wrapper.value.style.display = 'none';
    }

    return {
      state,
      onClick,
      linear,
      closeModal,
      onclickBouyMenu,
      modal_wrapper,
      props,
    };
  },
};
</script>

<style scoped>
.linear {
  width: 100%;
  height: 60px;
  background: #ffffff;
  border-radius: 20px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: grid;
  align-items: center;
  align-content: stretch;
  grid-template-columns: 2fr 0.1fr;
  grid-template-rows: 60px 1fr;
}

.line {
  width: 90%;
  height: 2px;
  border: 1px solid #a1c2c9;
  background: #a1c2c9;
  border-radius: 2px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  margin: 0 auto;
}

.text {
  font-weight: bold;
  font-size: 32px;
}

.circle {
  background: #c0e4e9;
  border-radius: 100px;
  border: 15px solid #c0e4e9;
  margin: -13px -2px 0px -2px;
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

.pink {
  background: #ffd1da !important;
  border-color: #ffd1da !important;
}

.scale_up {
  -webkit-animation: scale-up-ver-top 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: scale-up-ver-top 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2022-3-29 21:10:1
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation scale-up-ver-top
 * ----------------------------------------
 */
@-webkit-keyframes scale-up-ver-top {
  0% {
    -webkit-transform: scaleY(0.4);
    transform: scaleY(0.4);
    -webkit-transform-origin: 100% 0%;
    transform-origin: 100% 0%;
  }
  100% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
    -webkit-transform-origin: 100% 0%;
    transform-origin: 100% 0%;
  }
}
@keyframes scale-up-ver-top {
  0% {
    -webkit-transform: scaleY(0.4);
    transform: scaleY(0.4);
    -webkit-transform-origin: 100% 0%;
    transform-origin: 100% 0%;
  }
  100% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
    -webkit-transform-origin: 100% 0%;
    transform-origin: 100% 0%;
  }
}
</style>
