<template>
  <DetailList v-if="!state.isDetail" @setBouy="setBouy" />
  <BouyDetailComponent v-if="state.isDetail" :name="state.name" />
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
      name: '',
      isDetail: false,
    });

    onMounted(() => {
      state.name = route.params.name;

      if (route.params.name == undefined) {
        state.isDetail = false;
        store.commit('setHeader', '상세 정보');
      } else {
        state.isDetail = true;
        store.commit('setHeader', route.params.name + '구역 상세 정보');
      }
    });

    function setBouy(Bouy) {
      state.isDetail = true;
      state.name = Bouy;
      store.commit('setHeader', Bouy + '구역 상세 정보');
    }

    return { state, setBouy };
  },
};
</script>

<style></style>
