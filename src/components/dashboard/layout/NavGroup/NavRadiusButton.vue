<template>
  <div class="nav-button">
    <router-link class="nav_link" :to="props.url">{{ state.name }}</router-link>
  </div>
</template>

<script>
import { onMounted, reactive } from '@vue/runtime-core';

export default {
  props: {
    url: String,
  },
  setup(props) {
    let state = reactive({
      name: '',
    });

    onMounted(() => {
      switch (props.url) {
        case 'main':
          state.name = '대시보드';
          break;
        case 'detail':
          state.name = '상세정보';
          break;
        case 'setting':
          state.name = '설정';
          break;
        default:
          state.name = '모름';
          break;
      }
    });

    console.log(props.url);

    return { props, state };
  },
};
</script>

<style scoped>
.nav-button {
  width: 180px;
  margin: 20px 0px 20px 0px;
  border-radius: 20px 0px 0px 20px;
  padding-left: 15px;
  background: none;
  float: right;
  font-family: 'GmarketSansMedium';
  text-align: center;
}

.nav-button > a {
  display: flex;
  justify-content: center;

  text-align: center;
  font-size: 24px;
  color: rgba(225, 225, 225, 0.8);
}

.nav-button > a:hover {
  background-color: #ffffff !important;
  background: #ffffff;
  color: #505050;
  font-weight: bold;
  text-align: center;
  border-radius: 20px 0px 0px 20px;
}

.nav_link {
  align-items: center;
  height: 40px;
  padding: 0.5rem 1rem;
  border-radius: 20px 0px 0px 20px;
  text-decoration: none;
  color: #4f678c;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
}

.nav a.router-link-active {
  background-color: #ffffff !important;
  background: #ffffff;
  color: #505050;
  font-weight: bold;

  border-radius: 20px 0px 0px 20px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
}
</style>
