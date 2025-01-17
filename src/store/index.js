import Vue from "vue";
import Vuex from "vuex";
import modal from "./modules/modal";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem("token") || null,
  },
  getters: {
    isAuthenticated: (state) => state.token !== null,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      sessionStorage.setItem("token", token);
    },
    CLEAR_TOKEN(state) {
      state.token = null;
      sessionStorage.removeItem("token");
    },
  },
  modules: {
    modal
  }
});
