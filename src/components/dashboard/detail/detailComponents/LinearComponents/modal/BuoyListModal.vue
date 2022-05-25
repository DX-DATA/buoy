<template>
  <div class="modal">
    <h1 style="text-align: center; margin-bottom: 15px">{{ props.group_data.group_name }}구역 부표 관리</h1>
    <div class="table-group">
      <div class="table-header">
        <span class="t_center">부표 ID</span>
        <span>부표 모델</span>
        <span>그룹</span>
        <span class="t_center">라인</span>
        <span class="t_center">부표 관리</span>
        <span class="t_center">할당 해제</span>
      </div>
      <div class="table-body">
        <div class="table-item" v-for="(data, i) in state.data" :key="data">
          <span class="t_center">{{ data.model_idx }}</span>
          <span>{{ data.model }}</span>
          <!-- <span v-else><input type="text" v-model="data.model" class="modal_input"/></span> -->
          <span v-if="!state.is_modify[data.model_idx]">{{ data.group_name }}</span>
          <span v-else
            ><select v-model="data.group_id" class="modal_select">
              <option v-for="group in state.group_list" :key="group" :value="group.group_id">{{ group.group_name }}</option>
            </select></span
          >
          <span class="t_center" v-if="!state.is_modify[data.model_idx]">{{ data.line }}</span>
          <span class="t_center" v-else><input type="text" v-model="data.line" class="modal_input" /></span>
          <span class="t_center"
            ><button v-if="!state.is_modify[data.model_idx]" v-on:click="state.is_modify[data.model_idx] = !state.is_modify[data.model_idx]" class="modal-modify-button">부표 관리</button>
            <button v-else class="modal-done-button" v-on:click="modify_buoy(data.model, data.group_id, data.line, data.model_idx)">수정 완료</button>
          </span>
          <span class="t_center"><button class="modal-deallocate-button" v-on:click="deallocate(data.model, i)">할당 해제</button></span>
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
  emits: [''],
  props: {
    group_data: Object,
  },
  setup(props) {
    let store = useStore();
    let rerender = inject('rerender');
    let state = reactive({
      data: [],
      is_modify: {},
      group_list: store.getters.group,
    });

    onMounted(() => {
      getBuoys();
    });

    async function getBuoys() {
      state.data = await api._GET('detail/buoy/list?', `group_id=${props.group_data.group_id}`);

      for (let i = 0; i < state.data.length; i++) {
        state.is_modify[state.data.model_idx + ''] = false;
      }
    }

    async function modify_buoy(model, group_id, line, model_idx) {
      console.log(model, group_id, line);
      if (confirm('수정 하시겠습니까?')) {
        let result = await api._PUT('detail/buoy/allocate', { model: model, group_id: parseInt(group_id), line: parseInt(line) });

        if (result.code === 1) {
          alert('수정을 완료했습니다.');
          state.is_modify[model_idx + ''] = false;
          rerender();
        } else {
          alert('다시 시도해 주세요');
        }
      }
    }

    async function deallocate(model, i) {
      console.log(model);
      if (confirm('부이 할당을 해제하시겠습니까?')) {
        let result = await api._PUT('detail/buoy/deallocate', { model: model });
        if (result.code === 1) {
          alert('할당 해제를 완료했습니다.');
          state.data.splice(i, 1);
          rerender();
        } else {
          alert('다시 시도해 주세요');
        }
      }
    }

    return { props, state, modify_buoy, deallocate };
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

.table-group {
  display: flex;
  flex-direction: column;
}

.table-header {
  display: grid;
  grid-template-columns: 0.7fr 1.5fr 1.5fr 1fr 1fr 1fr;
  font-weight: bold;
  border-bottom: 1px solid black;
}

.table-body {
  display: flex;
  flex-direction: column;
}

.table-item {
  display: grid;
  grid-template-columns: 0.7fr 1.5fr 1.5fr 1fr 1fr 1fr;
  font-size: 18px;
  border-bottom: 2px solid #eeeeee;
}

.table-item > span {
  padding: 10px 0px 10px 0px;
}

.t_center {
  text-align: center;
}

.modal_input {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #606060;
  background: none;
  display: block;
  height: 30px;
  color: #606060;
  width: 60%;
  font-size: 16px;
  text-align: center;
  margin: 0 auto;
}

.modal_select {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #606060;
  background: none;
  display: block;
  height: 30px;
  color: #606060;
  width: 60%;
  font-size: 16px;
}

.modal_input::placeholder {
  color: #9a9a9a;
}

.modal_input:focus {
  outline: none;
  border-bottom: 2px solid #c8c8c8;
}
.modal_select::placeholder {
  color: #9a9a9a;
}

.modal_select:focus {
  outline: none;
  border-bottom: 2px solid #c8c8c8;
}

.modal-modify-button {
  width: 90px;
  height: 35px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  background: #198754;
  color: white;
  text-align: center;
  cursor: pointer;
  margin: -10px auto -10px auto;
}

.modal-done-button {
  width: 90px;
  height: 35px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  background: #0d6efd;
  color: white;
  text-align: center;
  cursor: pointer;
  margin: -10px auto -10px auto;
}

.modal-deallocate-button {
  width: 90px;
  height: 35px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  background: red;
  color: white;
  text-align: center;
  cursor: pointer;
  margin: auto;
  margin: -10px auto -10px auto;
}

.selected {
  background: #cbcbcb;
  cursor: default;
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
