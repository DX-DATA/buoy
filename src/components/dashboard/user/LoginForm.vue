<template>
  <div class="logo">스마트 해양 관제 시스템</div>
  <label class="input-label email">
    <input type="text" class="login-input" placeholder="이메일" v-model="state.email" @keyup.enter="submit" />
  </label>
  <label class="input-label password">
    <input type="password" class="login-input" placeholder="비밀번호" v-model="state.password" @keyup.enter="submit" />
  </label>
  <button class="login-button" v-on:click="submit">로그인</button>
  <button class="register-button" v-on:click="router.push('/register')">회원가입</button>
  <div class="etc-menu"><span>아이디</span> | <span>비밀번호 찾기</span></div>
  <span style="font-size: 12px; color: #eeeeee">또는</span>
  <hr />

  <span style="font-size: 14px; color: #eeeeee; margin: 12px 0px 24px 0px">SNS 계정으로 로그인</span>

  <div class="oauth-wrapper">
    <div class="g_id_signin" data-type="icon" data-size="large" data-theme="outline" data-shape="circle" data-logo_alignment="left"></div>
    <button class="btn-social-login" style="background: #1fc700" v-on:click="naverLogin"><i class="xi-2x xi-naver"></i></button>
    <button class="btn-social-login" style="background: #ffeb00" v-on:click="kakaoLogin"><i class="xi-2x xi-kakaotalk text-dark"></i></button>
  </div>
</template>

<script>
import axios from 'axios';
import { reactive } from '@vue/reactivity';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onBeforeMount, onMounted } from '@vue/runtime-core';
import api from '@/api/api';

export default {
  setup() {
    const store = useStore();
    const url = store.getters.url;

    let router = useRouter();
    let state = reactive({
      email: '',
      password: '',
    });

    onBeforeMount(() => {
      // eslint-disable-next-line
      if (google) {
        // eslint-disable-next-line
        google.accounts.id.initialize({
          client_id: '434234059341-3foip37f8u3ucgsf6dvdpg5cngpqiep5.apps.googleusercontent.com',
          callback: handleCredentialResponse,
        });
        // eslint-disable-next-line
        google.accounts.id.prompt();
      }

      const script = document.createElement('script');
      // eslint-disable-next-line
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      // eslint-disable-next-line

      document.head.appendChild(script); // eslint-disable-next-line
    });
    onMounted(() => {
      // eslint-disable-next-line
      window.Kakao.init('6f658858e3f911133199902d12e31f4b');
    });

    function submit() {
      let regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

      if (!regex.test(state.email)) {
        alert('이메일을 확인해 주세요');
        return;
      }

      axios
        .post(url + '/user/login', { email: state.email, password: state.password })
        .then((response) => {
          document.cookie = 'token=' + response.data.token + '; path=/;';
          router.push('/');
        })
        .catch((e) => {
          console.log(e);
          alert('이메일 또는 비밀번호를 확인해 주세요');
        });
    }

    async function handleCredentialResponse(response) {
      let result = await api._POST('user/oauth/google', response);
      if (result.code == 1) {
        document.cookie = 'token=' + result.token + '; path=/;';
        router.push('/');
      } else if (result.code == 0) {
        router.push({
          name: 'RegisterOauth',
          params: {
            title: '구글',
            sns: '1',
            email: result.email,
            name: result.name,
          },
        });
      } else if (result.code == 2) {
        alert('다른 sns 계정이 존재합니다');
        return;
      } else {
        alert('같은 이메일 계정이 존재합니다');
      }
    }

    function naverLogin() {
      window.location.replace('https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=v5hITj0N_18gCcJFIECV&state=abcdefg&redirect_uri=http://localhost:8080/login/oauth/naver');
    }

    function kakaoLogin() {
      // window.Kakao.Auth.authorize({
      //   redirectUri: 'http://localhost:8080/login/oauth/kakao',
      // });
      // eslint-disable-next-line
      // window.kakao.isInitialized();

      window.Kakao.Auth.login({
        success: function () {
          window.Kakao.API.request({
            url: '/v2/user/me',
            data: {
              property_keys: ['kakao_account.email', 'kakao_account.profile'],
            },
            success: async function (response) {
              let result = await api._POST('user/oauth/kakao', response);
              if (result.code == 1) {
                document.cookie = 'token=' + result.token + '; path=/;';
                router.push('/');
              } else if (result.code == 0) {
                router.push({
                  name: 'RegisterOauth',
                  params: {
                    title: '카카오',
                    sns: '3',
                    email: result.email,
                    name: result.name,
                  },
                });
              } else if (result.code == 2) {
                alert('다른 sns 계정이 존재합니다');
                return;
              } else {
                alert('같은 이메일 계정이 존재합니다');
              }
            },
            fail: function (error) {
              console.log(error);
            },
          });
        },
        fail: function (error) {
          console.log(error);
        },
      });
    }

    return { state, submit, router, handleCredentialResponse, naverLogin, kakaoLogin };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;500&display=swap');

.logo {
  display: flex;
  align-items: center;
  font-size: 32px;
  font-weight: bold;

  height: 30%;
}
.input-label {
  width: 85%;
  margin: 0px 0px 40px 0px;
  border-bottom: 1px solid #e1e1e1;

  position: relative;
}

.input-label:focus-within {
  border-bottom: 2px solid #e1e1e1;
}

.email::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 40px;
  background: url('../../../assets/user/id_icon.svg');
  background-repeat: no-repeat;
  background-size: 25px;
}

.password::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 40px;
  background: url('../../../assets/user/pw_icon.svg');
  background-repeat: no-repeat;
  background-size: 25px;
}

.login-input {
  margin-left: 50px;
  margin-bottom: 5px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: none;
  background: none;
  display: block;
  height: 30px;
  color: #c8c8c8;
  width: 80%;
  font-size: 18px;
}

.login-input::placeholder {
  color: #c8c8c8;
}

.login-input:focus {
  outline: none;
}

.login-input:-webkit-autofill,
.login-input:-webkit-autofill:hover,
.login-input:-webkit-autofill:focus,
.login-input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 1000px #3f5369 !important;
  box-shadow: 0 0 0 1000px #3f5369 inset;
}

.login-button {
  width: 85%;
  height: 45px;
  border: none;
  background: #f09553;
  border-radius: 20px;
  margin-bottom: 15px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}

.register-button {
  width: 85%;
  height: 45px;
  border: none;
  background: #ffffff;
  border-radius: 20px;
  color: #757575;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}

.etc-menu {
  margin: 10px 0px 10px 0px;
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  width: 80%;
}

hr {
  width: 85%;
}

.oauth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.btn-social-login {
  transition: all 0.2s;
  outline: 0;
  border: 1px solid transparent;
  padding: 0.5rem !important;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
}
.btn-social-login:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
.text-dark {
  color: #343a40 !important;
}
</style>
