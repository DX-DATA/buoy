<template>
  <detail-list v-if="!state.isDetail" @setGroup="setGroup" />
  <bouy-detail-component v-if="state.isDetail" :name="state.name" :group_id="state.group_id" @backButton="backButton" />
</template>

<script>
import { onMounted, reactive } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import DetailList from '@/components/dashboard/detail/DetailList.vue';
import BouyDetailComponent from '@/components/dashboard/detail/BouyDetailComponent.vue';
import { useStore } from 'vuex';
export default {
  components: { DetailList, BouyDetailComponent },
  props: {
    name: String,
  },
  setup() {
    let store = useStore();
    let route = useRoute();

    let state = reactive({
      group_id: 0,
      name: '',
      isDetail: false,
    });

    onMounted(() => {
      state.name = route.params.name;
      state.group_id = parseInt(route.params.group_id);
      if (route.params.group_id == undefined) {
        state.isDetail = false;
        store.commit('setHeader', '상세 정보');
      } else {
        state.isDetail = true;
        store.commit('setHeader', route.params.name + '구역 상세 정보');
      }
    });

    function setGroup(name, group_id) {
      state.isDetail = true;
      state.name = name;
      state.group_id = group_id;
      store.commit('setHeader', name + '구역 상세 정보');
    }

    function backButton() {
      state.isDetail = false;
      store.commit('setHeader', '상세 정보');
    }

    return { state, setGroup, backButton };
  },
};
</script>

<style></style>
