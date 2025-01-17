const state = {
  show: false,
  title: "",
  message: [],
  config: null,
};

const mutations = {
  SHOW_MODAL(state, { title = "", message = [], config = null } = {}) {
    state.show = true;
    state.title = title;
    state.message = message;
    state.config = config;
  },
  HIDE_MODAL(state) {
    state.show = false;
    state.title = "";
    state.message = [];
    state.config = null;
  },
};

const actions = {
  showMessage({ commit }, { title, message, onClose }) {
    commit("SHOW_MODAL", {
      title,
      message: message,
      config: {
        showClose: true,
		onClose,
      },
    });
  },

  showConfirm({ commit }, { title, message, onConfirm, onCancel }) {
    commit("SHOW_MODAL", {
      title,
      message: message,
      config: {
        showConfirm: true,
        showCancel: true,
        onConfirm,
        onCancel,
      },
    });
  },

  showError({ commit }, { title, message, onClose }) {
    commit("SHOW_MODAL", {
      title: title || "错误",
      message: message,
      config: {
        showClose: true,
        onClose,
      },
    });
  },

  showCustomModal({ commit }, { title, message, config }) {
    commit("SHOW_MODAL", {
      title,
      message: message,
      config,
    });
  },

  hideModal({ commit }) {
    commit("HIDE_MODAL");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
