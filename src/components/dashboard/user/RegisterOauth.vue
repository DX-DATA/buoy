<template>
  <div class="register-wrapper slide-in-blurred-left">
    <h1 class="h1-title">{{ state.title }} 계정으로 시작합니다!</h1>
    <div class="input-group">
      <RegisterInput v-for="data in plainInput" :data="data" :key="data" />
    </div>

    <button class="button" v-on:click="submit">시작하기</button>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import axios from 'axios';
import RegisterInput from './child/RegisterInput.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { onMounted } from '@vue/runtime-core';
export default {
  components: { RegisterInput },
  setup() {
    let store = useStore();
    // let router = useRouter();
    let route = useRoute();
    let url = store.getters.url;

    let state = reactive({
      title: '',
    });

    let plainInput = reactive({
      email: {
        title: '이메일',
        value: '',
      },
      name: {
        title: '이름',
        value: '',
      },
    });

    onMounted(() => {
      console.log(route.params);
      state.title = route.params.title;
      plainInput.email.value = route.params.email;
      plainInput.name.value = route.params.name;
    });

    function submit() {
      let param = {
        email: route.params.email,
        name: route.params.name,
        sns_type: parseInt(route.params.sns),
      };

      if (confirm('회원가입을 진행하시겠습니까?')) {
        axios.post(url + '/user/oauth/register', param).then((response) => {
          if (response.data.code === 1) {
            alert('회원가입을 완료했습니다. SNS 계정으로 로그인 해주세요.');
            location.href = '/';
          } else {
            alert('회원가입을 실패 했습니다. 다시 시도해 주세요.');
          }
        });
      }
    }

    return { state, plainInput, submit };
  },
};
</script>

<style scoped>
.register-wrapper {
  width: 85%;
  padding-top: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.h1-title {
  margin: 0px 0px 15px 0px;
  text-align: center;
}

.input-group {
  flex-wrap: wrap;
}
.button {
  width: 100%;
  height: 45px;
  border: none;
  background: #f09553;
  border-radius: 20px;
  margin: auto 0px 50px 0px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}

hr {
  width: 85%;
}

.slide-in-blurred-left {
  -webkit-animation: slide-in-blurred-left 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
  animation: slide-in-blurred-left 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2022-5-3 15:54:6
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation slide-in-blurred-left
 * ----------------------------------------
 */
@-webkit-keyframes slide-in-blurred-left {
  0% {
    -webkit-transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
    transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
    -webkit-transform-origin: 100% 50%;
    transform-origin: 100% 50%;
  }
  100% {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
    transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
  }
}
@keyframes slide-in-blurred-left {
  0% {
    -webkit-transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
    transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
    -webkit-transform-origin: 100% 50%;
    transform-origin: 100% 50%;
  }
  100% {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
    transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
  }
}
</style>
