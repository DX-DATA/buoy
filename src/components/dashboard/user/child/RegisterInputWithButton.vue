<template>
  <div class="input-area">
    <label>{{ props.data.title }}</label>
    <div class="input-button">
      <input type="text" class="input" :placeholder="props.data.title" v-model="props.data.value" />
      <button class="button" v-if="props.data.title === '이메일' && !props.data.is_checked" v-on:click="check_duple_emit">중복확인</button>
      <button class="button" v-else-if="props.data.title === '인증번호'" v-on:click="auth_email_emit">인증하기</button>

      <button class="button" v-if="props.data.title === '이메일' && props.data.is_checked" v-on:click="send_key_emit">인증번호 전송</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  setup(props, context) {
    console.log(props);

    function check_duple_emit() {
      context.emit('check_duple');
    }

    function send_key_emit() {
      console.log('send_key');
      context.emit('send_key');
    }

    function auth_email_emit() {
      context.emit('auth_email');
    }

    return { props, check_duple_emit, send_key_emit, auth_email_emit };
  },
};
</script>

<style>
label {
  font-size: 18px;
  color: #c8c8c8;
}

.input-area {
  margin-bottom: 30px;
}

.input-button {
  display: flex;
  align-items: flex-end;
  gap: 20px;
}

.input {
  margin-top: 20px;
  margin-bottom: 5px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #e1e1e1;
  background: none;
  display: block;
  height: 30px;
  color: #c8c8c8;
  width: 100%;
  font-size: 16px;
}

.input::placeholder {
  color: #9a9a9a;
}

.input:focus {
  outline: none;
  border-bottom: 2px solid #c8c8c8;
}

.button {
  width: 40%;
  height: 40px;
  border: none;
  background: #f09553;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}
</style>
