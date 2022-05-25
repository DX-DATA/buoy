<template>
  <div>
    <div class="detail-list">
      <div class="item" v-for="group in state.group" :key="group" v-on:click="emitGroup(group.group_name, group.group_id)">{{ group.group_name }} 구역</div>
      <div class="add" v-on:click="openModal">구역 추가</div>
    </div>

    <add-modal v-if="state.click"></add-modal>
    <div class="modal-wrapper fade-in" ref="modal_wrapper" v-on:click="closeModal"></div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import api from '@/api/api';
import AddModal from './AddModal.vue';
import { useStore } from 'vuex';

export default {
  components: { AddModal },
  setup(props, context) {
    let store = useStore();

    let state = reactive({
      group: [],
      click: false,
    });

    const modal_wrapper = ref(null);

    onMounted(async () => {
      let data = await api._GET('detail/group/list');
      state.group = data;
      store.commit('setGroup', data);
    });

    function emitGroup(name, group_id) {
      context.emit('setGroup', name, group_id);
    }

    function openModal() {
      state.click = true;
      modal_wrapper.value.style.display = 'block';
    }

    function closeModal() {
      state.click = false;
      modal_wrapper.value.style.display = 'none';
    }

    return { state, emitGroup, openModal, closeModal, modal_wrapper };
  },
};
</script>

<style scoped>
.detail-list {
  display: grid;
  padding: 48px 48px 0px 48px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;
}

.item {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
  border: 1px solid #cbcbcb;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(178, 178, 207, 0.44);
  border-radius: 10px;

  font-weight: bold;
  font-size: 38px;
  font-family: 'GmarketSansMedium';
  cursor: pointer;
}

.add {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #cbcbcb;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(178, 178, 207, 0.44);
  border-radius: 10px;

  font-weight: bold;
  font-size: 38px;
  font-family: 'GmarketSansMedium';
  cursor: pointer;
}
</style>
