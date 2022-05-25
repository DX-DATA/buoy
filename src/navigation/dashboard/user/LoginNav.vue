<template>
  <div class="login-container">
    <div class="login-box"><router-view></router-view></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  setup() {
    function request() {
      axios.post('/');
    }

    return { request };
  },
};
</script>

<style>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

.login-box {
  height: 780px;
  width: 550px;
  background: #3f5369;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}
</style>
