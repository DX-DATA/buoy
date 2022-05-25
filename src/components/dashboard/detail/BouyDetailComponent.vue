<template>
  <div class="detail-container">
    <img :src="require('@/assets/arrow-left.svg')" v-on:click="back" class="img-svg" />

    <group-data :group_data="state.group_data" v-if="state.loading" :key="state.render" />

    <!-- <DetailLinear v-for="line in state.line" :key="line" :line="line" /> -->
    <new-detail-linear :line="state.line" :key="state.line" v-if="state.loading && state.line.length !== 0" />
  </div>

  <div class="modal-wrapper fade-in" ref="modal_wrapper" v-on:click="closeModal"></div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import NewDetailLinear from './detailComponents/NewDetailLinear.vue';
import GroupData from './detailComponents/GroupData.vue';
import { onMounted, provide } from '@vue/runtime-core';
import api from '@/api/api';

export default {
  components: { NewDetailLinear, GroupData },
  props: { name: String, group_id: Number },
  emits: ['backButton'],
  setup(props, context) {
    const modal_wrapper = ref(null);
    provide('group_id', props.group_id);
    provide('rerender', async () => {
      await init();
      state.render++;
    });
    let state = reactive({
      isModal: false,
      line: [],
      group_data: {
        group_height: 0,
        group_id: 0,
        group_latitude: 0,
        group_longitude: 0,
        group_name: 0,
        group_salinity: 0,
        group_system: 0,
        group_water_temp: 0,
        group_weight: 0,
        plain_buoy: 0,
        region: '알수없음',
        smart_buoy: 0,
      },
      group_system: '일반 수하식',
      loading: false,
      render: 0,
    });

    onMounted(async () => {
      init();
    });

    async function init() {
      let query = `?group_id=${props.group_id}`;
      let data = await api._GET('detail/group/web', query);
      state.line = data.lines;

      if (data.group_data.group_salinity === undefined) {
        state.group_data.group_id = data.group_data.group_id;
        state.group_data.group_name = data.group_data.group_name;
        state.group_data.plain_buoy = data.group_data.plain_buoy;
        state.group_data.smart_buoy = data.group_data.smart_buoy;
      } else {
        state.group_data = data.group_data;
      }

      state.loading = true;
    }

    function onclickMenu() {
      state.isModal = true;
      modal_wrapper.value.style.display = 'block';
    }

    function closeModal() {
      state.isModal = false;
      modal_wrapper.value.style.display = 'none';
    }

    function back() {
      context.emit('backButton');
    }

    return { state, onclickMenu, closeModal, modal_wrapper, back };
  },
};
</script>

<style scoped>
.detail-container {
  padding: 48px 48px 48px 48px;
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  row-gap: 20px;
}

.text {
  font-weight: bold;
  font-size: 32px;
}

.plus-line {
  grid-column: 1 / 3;
  border: 1px dashed gray;
  border-style: dashed;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.plus-line > img {
  width: 38px;
  cursor: pointer;
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

.img-svg {
  width: 32px;
  cursor: pointer;
}
</style>
