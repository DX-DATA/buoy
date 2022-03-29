import { createStore } from 'vuex';

export default createStore({
  state: {
    header: '대시보드',
  },
  getters: {
    header(state) {
      return state.header;
    },
  },
  mutations: {
    setHeader(state, value) {
      state.header = value;
    },
  },
});
