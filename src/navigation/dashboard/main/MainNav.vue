<template>
  <DashboardMain />
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
import DashboardMain from '../../../components/dashboard/main/Main.vue';

export default {
  components: {
    DashboardMain,
  },
  setup() {
    let store = useStore();

    onMounted(() => {
      store.commit('setHeader', '대시보드');
    });
  },
};
</script>

<style></style>
