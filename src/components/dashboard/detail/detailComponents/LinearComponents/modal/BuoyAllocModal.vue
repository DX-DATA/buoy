<template>
  <div class="modal">
    <h1 style="text-align: center; margin-bottom: 15px">{{ props.group_name }}구역 부표 할당</h1>
    <div class="buoy_wrapper" v-if="!state.clicked">
      <div v-for="buoy in state.data" :key="buoy" class="buoy-item" v-on:click="onClick(buoy)">
        <div class="top-text">{{ buoy.model_idx }}</div>
        <div class="bottom-text">{{ buoy.model }}</div>
        <div class="location-text">{{ buoy.latitude }}, {{ buoy.longitude }}</div>
      </div>
    </div>

    <div class="insert_wrapper" v-if="state.clicked">
      <img :src="require('@/assets/arrow-left.svg')" v-on:click="state.clicked = false" class="img-svg" />

      <div class="inner-div">
        <div>
          <label>할당 부표 ID</label>
          <input type="text" class="input" v-model="state.clicked_idx" disabled />
        </div>
        <div>
          <label>할당 모델</label>
          <input type="text" class="input" v-model="state.clicked_model" disabled />
        </div>
        <div>
          <label>할당 라인</label>
          <input type="text" class="input" v-model="state.set_line" placeholder="할당 할 라인을 입력해주세요" />
        </div>
        <div style="text-align: center">
          <button class="alloc-button" v-on:click="modify_buoy">부표 할당</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, reactive } from 'vue';
import api from '@/api/api';
import { useStore } from 'vuex';

export default {
  props: {
    group_name: String,
  },
  setup(props) {
    let store = useStore();
    let state = reactive({
      data: [],
      group_list: store.getters.group,
      clicked: false,
      clicked_idx: '',
      clicked_model: '',
      set_line: '',
    });

    let rerender = inject('rerender');

    let group_id = inject('group_id');

    onMounted(() => {
      getBuoys();
    });

    async function getBuoys() {
      state.data = await api._GET('detail/buoy/unassigned?');
    }

    async function modify_buoy() {
      console.log(state.clicked_model, parseInt(group_id), parseInt(state.set_line));
      if (confirm('할당 하시겠습니까?')) {
        let result = await api._PUT('detail/buoy/allocate', { model: state.clicked_model, group_id: parseInt(group_id), line: parseInt(state.set_line) });

        if (result.code === 1) {
          alert('부표 할당을 완료했습니다.');
          rerender();
        } else {
          alert('다시 시도해 주세요');
        }
      }
    }

    function onClick(buoy) {
      state.clicked_idx = buoy.model_idx;
      state.clicked_model = buoy.model;
      state.clicked = true;
    }
    return { props, state, modify_buoy, onClick };
  },
};
</script>

<style scoped>
.modal {
  z-index: 102;
  width: 40vw;
  height: 50vh;
  background: white;
  position: fixed;
  -webkit-animation: scale-up-center 0.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: scale-up-center 0.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  top: 20vh;
  left: 60vh;
  border: 1px solid #cbcbcb;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.44);
  border-radius: 5px;
  overflow-y: scroll;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.modal::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.modal::-webkit-scrollbar-track {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
}
.modal::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
}
.modal::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.4);
}
.modal::-webkit-scrollbar-thumb:active {
  background: rgba(0, 0, 0, 0.9);
}

.buoy_wrapper {
  border-top: 2px solid #eeeeee;
  margin-top: 5px;
  padding-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 15px;
}

.top-text {
  font-weight: bold;
  font-size: 24px;
  font-family: 'GmarketSansMedium';
  text-align: center;
  color: #8d8682;
}

.bottom-text {
  font-weight: bold;
  font-size: 32px;
  font-family: 'GmarketSansMedium';
}

.buoy-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 140px;
  border: 1px solid #cbcbcb;
  border-radius: 10px;
  box-shadow: -1px 4px 7px rgb(189 193 215 / 25%);
  background: #f9f9f9;
  cursor: pointer;
}

.location-text {
  text-align: center;
  font-size: 12px;
  color: #8d8682;
}

.insert_wrapper {
  border-top: 2px solid #eeeeee;
  margin-top: 5px;
  padding-top: 10px;
  gap: 15px;
  flex-grow: 1;
}

.inner-div {
  width: 60%;
  margin: 50px auto 0px auto;
  border: 1px solid #eeeeee;
  box-shadow: -1px 4px 7px rgb(189 193 215 / 25%);
  border-radius: 10px;
  padding: 20px;
}

.input-area {
  margin-bottom: 30px;
}

label {
  color: #606060;
}

.input {
  margin-top: 5px;
  margin-bottom: 20px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #606060;
  background: none;
  display: block;
  height: 30px;
  color: black;
  width: 100%;
  font-size: 16px;
}

.input::placeholder {
  color: #8d8682;
}

.input:focus {
  outline: none;
  border-bottom: 2px solid #c8c8c8;
}

.img-svg {
  width: 28px;
  cursor: pointer;
}

.alloc-button {
  width: 120px;
  height: 50px;
  border: none;
  border-radius: 5px;
  background: #0d6efd;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  font-family: 'GmarketSansMedium';
  text-align: center;
  cursor: pointer;
  margin: 0 auto;
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
</style>
