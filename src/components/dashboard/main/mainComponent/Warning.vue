<template>
  <div class="warning">
    <img class="warn-svg" src="../../../../assets/warning.svg" />
    <div class="msg" v-on:click="onClick">{{ state.msg }}</div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
export default {
  props: {
    msg: Object,
  },
  setup(props) {
    let router = useRouter();
    const state = reactive({
      data: {},
      msg: '',
    });

    onMounted(() => {
      state.data = props.msg;
      let data = props.msg;
      state.msg = `${data.area} 구역 ${data.line}번 라인의`;

      switch (data.warn.type) {
        case 'height': {
          state.msg += ` 높이가 ${data.warn.status === 'row' ? '낮습니다' : '높습니다'}`;
          break;
        }
        case 'weight': {
          state.msg += ` 무게가 용적량 한계에 도달합니다.`;

          break;
        }
        case 'location':
          state.msg += ` ${data.warn.target}번 스마트 부표의 위치를 확인해 주세요`;
          break;
      }
    });

    function onClick() {
      router.push({
        name: 'Detail',
        params: {
          name: props.msg.area,
          data: JSON.stringify(state.data),
        },
      });
    }

    return { props, state, onClick };
  },
};
</script>

<style scoped>
.warning {
  display: flex;
  align-items: center;
  column-gap: 10px;
  margin-top: 5px;
  color: #e87c40;
  font-size: 24px;
  font-family: 'GmarketSansMedium';
  font-weight: bold;
}

.msg {
  cursor: pointer;
}

.warn-svg {
  width: 32px;
  cursor: pointer;
}
</style>
