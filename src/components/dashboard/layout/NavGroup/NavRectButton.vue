<template>
  <div class="nav-button">
    <router-link class="nav_link" :to="props.url" v-if="props.url != 'logout'">{{ state.name }}</router-link>
    <a v-on:click="logout" v-else class="plain-a">{{ state.name }}</a>
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
        case 'logout':
          state.name = '로그아웃';
          break;
        default:
          state.name = '모름';
          break;
      }
    });

    async function logout() {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      location.href = '/';
    }

    return { props, state, logout };
  },
};
</script>

<style scoped>
.nav-button {
  width: 80%;
  text-align: center;
  margin: 20px auto 20px auto;
  border-radius: 10px 10px 10px 10px;
  background: none;
  font-family: 'NanumBarunGothicYetHangul';
}

.nav-button > a {
  display: flex;
  justify-content: center;
  font-size: 22px;
  color: rgba(225, 225, 225, 0.8);
}

.plain-a {
  align-items: center;
  height: 20px;
  padding: 1rem 1rem;
  border-radius: 10px 10px 10px 10px;
  text-decoration: none;
  color: #4f678c;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
  cursor: pointer;
}

.nav-button > a:hover {
  background-color: #ffffff !important;
  background: #ffffff;
  color: #4f678c;

  border-radius: 10px 10px 10px 10px;
}

.nav_link {
  align-items: center;
  height: 20px;
  padding: 1rem 1rem;
  border-radius: 10px 10px 10px 10px;
  text-decoration: none;
  color: #4f678c;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
}

.nav a.router-link-active {
  background-color: #ffffff !important;
  background: #ffffff;
  color: #4f678c;
  border-radius: 10px 10px 10px 10px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
}
</style>
