<template>
  <div class="nav">
    <div class="logo">Logo</div>
    <hr class="line" />

    <div class="button-group">
      <div v-for="url in state.url" :key="url">
        <NavButton :url="url" />
      </div>
    </div>

    <div class="bottom">
      <NavBottomButton :url="'logout'" />
      <hr class="bottom-line" />
      <NavBottomButton :url="'setting'" />
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import NavButton from './NavGroup/NavRadiusButton.vue';
import NavBottomButton from './NavGroup/NavRectButton.vue';
export default {
  components: {
    NavButton,
    NavBottomButton,
  },
  setup() {
    let state = reactive({
      url: ['main', 'detail'],
    });

    return { state };
  },
};
</script>

<style scoped>
.nav {
  margin: 0px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #4f678c 0%, #222b37 100%);
}

.logo {
  margin: 50px auto 0px auto;
}

.button-group {
  display: flex;
  flex-direction: column;
}

.line {
  border-bottom: 1px solid #ffffff;
  width: 80%;
  margin: 50px auto 30px auto;
}

.bottom-line {
  border-bottom: 1px solid #ffffff;
  width: 80%;
  margin: 0px auto 30px auto;
}
.bottom {
  margin: auto 0px 0px 0px;
}
</style>
