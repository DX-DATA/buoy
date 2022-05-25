<template>
  <div class="manage-wrapper">
    <div class="top-item">
      <div class="title-text">구역 이름</div>
      <div v-if="!state.isModify">{{ state.group_data.group_name }}</div>
      <div v-if="state.isModify" class="select-wrapper">
        <input type="text" v-model="state.group_data.group_name" />
      </div>
    </div>
    <div class="top-item">
      <div class="title-text">양식 방법</div>
      <div v-if="!state.isModify">{{ state.group_system }}</div>
      <div v-if="state.isModify" class="select-wrapper">
        <select v-model="state.group_data.group_system">
          <option value="0">일반 수하식</option>
          <option value="1">연승 수하식</option>
          <option value="2">뗏목 수하식</option>
          <option value="3">기타 수하식</option>
        </select>
      </div>
    </div>
    <div class="top-item">
      <div class="title-text">일반 부표 개수</div>
      <div v-if="!state.isModify">{{ state.group_data.plain_buoy }}개</div>
      <div v-if="state.isModify" class="select-wrapper">
        <input type="text" v-model="state.group_data.plain_buoy" />
      </div>
    </div>
    <div class="top-item">
      <div class="title-text">스마트 부표 개수</div>
      <div>{{ state.group_data.smart_buoy }}개</div>
    </div>
    <div class="top-item">
      <div class="title-text">구역 위치</div>
      <div>{{ state.group_data.region }}</div>
    </div>
    <div class="top-item">
      <div class="title-text">평균 높이</div>
      <div>{{ parseFloat(state.group_data.group_height).toFixed(2) }}cm</div>
    </div>
    <div class="top-item">
      <div class="title-text">평균 무게</div>
      <div>{{ parseFloat(state.group_data.group_weight).toFixed(2) }}kg</div>
    </div>
    <div class="top-item">
      <div class="title-text">평균 염분</div>
      <div>{{ parseFloat(state.group_data.group_salinity).toFixed(2) }}psu</div>
    </div>
    <div class="top-item">
      <div class="title-text">평균 수온</div>
      <div>{{ parseFloat(state.group_data.group_water_temp).toFixed(2) }}℃</div>
    </div>
    <button class="manage-button" v-if="!state.isModify" v-on:click="modifyInit">구역 관리</button>
    <div class="button-group" v-if="state.isModify">
      <button class="buoy-manage-button" v-on:click="openModal">부표관리</button>
      <button class="modify2" v-on:click="openAllcModal">부표 할당</button>
      <button class="delete-button" v-on:click="deleteGroup">구역삭제</button>
      <button class="modify-button" v-on:click="modifySubmit">수정완료</button>
    </div>
  </div>
  <buoy-alloc-modal v-if="state.alloc" :group_name="state.group_data.group_name"></buoy-alloc-modal>
  <buoy-list-modal v-if="state.click" :group_data="state.group_data"></buoy-list-modal>
  <div class="modal-wrapper fade-in" ref="modal_wrapper" v-on:click="closeModal"></div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import { onMounted, watch } from '@vue/runtime-core';
import api from '@/api/api.js';
import { useStore } from 'vuex';
import BuoyListModal from './LinearComponents/modal/BuoyListModal.vue';
import BuoyAllocModal from './LinearComponents/modal/BuoyAllocModal.vue';
export default {
  components: { BuoyListModal, BuoyAllocModal },
  props: {
    group_data: Object,
  },
  setup(props) {
    let store = useStore();
    const modal_wrapper = ref(null);

    let state = reactive({
      isModify: false,
      group_name: '',
      group_data: {},
      group_system: '일반 수하식',
      click: false,
      alloc: false,
    });

    onMounted(() => {
      state.group_data = props.group_data;

      switch (state.group_data.group_system) {
        case 0:
          state.group_system = '일반 수하식';
          break;
        case 1:
          state.group_system = '연승 수하식';
          break;
        case 2:
          state.group_system = '뗏목 수하식';
          break;
        case 3:
          state.group_system = '기타 수하식';
          break;
        default:
          break;
      }
    });

    watch(
      () => state.group_data.group_system,
      (newData) => {
        switch (parseInt(newData)) {
          case 0:
            state.group_system = '일반 수하식';
            break;
          case 1:
            state.group_system = '연승 수하식';
            break;
          case 2:
            state.group_system = '뗏목 수하식';
            break;
          case 3:
            state.group_system = '기타 수하식';
            break;
          default:
            break;
        }
      }
    );

    function modifyInit() {
      state.isModify = !state.isModify;
    }

    async function modifySubmit() {
      let params = {
        group_id: state.group_data.group_id,
        group_name: state.group_data.group_name,
        group_system: parseInt(state.group_data.group_system),
        plain_buoy: parseInt(state.group_data.plain_buoy),
      };

      let res = await api._PUT('detail/group/modify', params);

      if (res.code == 1) {
        alert('수정을 완료했습니다.');
        state.isModify = !state.isModify;
        store.commit('setHeader', state.group_data.group_name + '구역 상세 정보');
      } else {
        alert('수정에 실패했습니다. 다시 시도해주세요.');
      }
    }

    function openModal() {
      state.click = true;
      modal_wrapper.value.style.display = 'block';
    }

    function openAllcModal() {
      state.alloc = true;
      modal_wrapper.value.style.display = 'block';
    }

    function closeModal() {
      state.click = false;
      state.alloc = false;
      modal_wrapper.value.style.display = 'none';
    }

    async function deleteGroup() {
      console.log(state.group_data.group_id);
      if (confirm('삭제하시겠습니까?')) {
        let result = await api._POST('detail/group/delete', { group_id: parseInt(state.group_data.group_id) });

        if (result.code === 1) {
          alert('그룹 삭제를 완료했습니다.');
          location.reload();
        }
      }
    }

    return { state, modifyInit, modifySubmit, modal_wrapper, openModal, closeModal, openAllcModal, deleteGroup };
  },
};
</script>

<style>
.manage-wrapper {
  grid-column: 1 / 3;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  justify-content: space-between;
}

.manage-button {
  width: 120px;
  height: 50px;
  border: none;
  border-radius: 5px;
  background: #6610f2;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  font-family: 'GmarketSansMedium';
  text-align: center;
  cursor: pointer;
  margin: auto;
}

.modify-button {
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
  margin: auto;
}

.modify2 {
  width: 120px;
  height: 50px;
  border: none;
  border-radius: 5px;
  background: rgb(24, 65, 179);
  color: white;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  font-family: 'GmarketSansMedium';
  text-align: center;
  cursor: pointer;
  margin: auto;
}

.buoy-manage-button {
  width: 120px;
  height: 50px;
  border: none;
  border-radius: 5px;
  background: #198754;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  font-family: 'GmarketSansMedium';
  text-align: center;
  cursor: pointer;
  margin: auto;
}

.delete-button {
  width: 120px;
  height: 50px;
  border: none;
  border-radius: 5px;
  background: #dc3545;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  font-family: 'GmarketSansMedium';
  text-align: center;
  cursor: pointer;
  margin: auto;
}

.text {
  font-weight: bold;
  font-size: 32px;
}

.top-item-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.top-item {
  background: #f9f9f9;
  border: 1px solid #c4c9d3;
  border-radius: 10px;
  box-shadow: -1px 4px 7px rgb(189 193 215 / 25%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  gap: 10px;
  font-weight: bold;
  font-size: 32px;
}

.select-wrapper {
  height: 42.67px;
  display: flex;
  align-items: center;
}

.select-wrapper > select {
  border: 1px solid #b3b0ae;
  border-radius: 6px;
  font-size: 1rem;
  width: 150px;
  height: 40px;
}

.select-wrapper > input {
  border: 1px solid #b3b0ae;
  border-radius: 6px;
  font-size: 1rem;
  width: 150px;
  height: 40px;
}

.title-text {
  font-weight: bold;
  font-size: 24px;
  font-family: 'GmarketSansMedium';
  text-align: center;
  color: #8d8682;
}

.button-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
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
</style>
