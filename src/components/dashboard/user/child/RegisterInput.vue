<template>
  <div class="input-area">
    <label>{{ props.data.title }}</label>
    <input type="password" class="input" :placeholder="props.data.title" v-model="props.data.value" v-if="props.data.title === '비밀번호' || props.data.title === '비밀번호 확인'" />
    <input type="text" class="input" :placeholder="props.data.title" v-model="props.data.value" v-else disabled />
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  setup(props) {
    console.log(props);
    return { props };
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
</style>
