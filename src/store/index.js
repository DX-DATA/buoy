import { createStore } from 'vuex';

export default createStore({
  state: {
    header: '대시보드',
    url: 'http://192.168.0.20:3124',
    group: {},
  },
  getters: {
    header(state) {
      return state.header;
    },
    url(state) {
      return state.url;
    },
    group(state) {
      return state.group;
    },
  },
  mutations: {
    setHeader(state, value) {
      state.header = value;
    },
    setGroup(state, value) {
      state.group = value;
    },
  },
});
