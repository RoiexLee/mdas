import Vue from "vue";
import Vuex from "vuex";
import modal from "./modules/modal";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem("token") || null,
    userInfo: JSON.parse(sessionStorage.getItem("userInfo")) || null,
  },
  getters: {
    isAuthenticated: (state) => state.token !== null,
    userInfo: (state) => state.userInfo,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      sessionStorage.setItem("token", token);
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo;
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
    CLEAR(state) {
      state.token = null;
      state.userInfo = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userInfo");
    },
  },
  modules: {
    modal,
  },
});
