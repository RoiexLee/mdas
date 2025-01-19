<template>
  <header class="header-global">
    <base-nav class="navbar-main" effect="light" expand transparent type="">
      <router-link class="navbar-brand mr-lg-5" to="/">
        <span class="navbar-brand mr-lg-5">自动人格评测系统</span>
      </router-link>
      <ul class="navbar-nav align-items-lg-center ml-lg-auto">
        <template v-if="isAuthenticated()">
          <li class="nav-item">
            <router-link class="nav-link" to="/profile">
              <i class="fa fa-user-circle"></i>
              <span class="nav-link-inner--text">个人中心</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/collection">
              <i class="fa fa-database"></i>
              <span class="nav-link-inner--text">采集数据</span>
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="handleLogout">
              <i class="fa fa-sign-out"></i>
              <span class="nav-link-inner--text">退出</span>
            </a>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">
              <i class="fa fa-user-plus"></i>
              <span class="nav-link-inner--text">注册</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">
              <i class="fa fa-user"></i>
              <span class="nav-link-inner--text">登录</span>
            </router-link>
          </li>
        </template>
      </ul>
    </base-nav>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import Modal from "@/components/Modal.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown,
    Modal,
  },
  methods: {
    ...mapGetters(["isAuthenticated"]),
    ...mapActions("modal", ["showMessage"]),
    handleLogout() {
      this.$store.commit("CLEAR_TOKEN");
      this.$router.push("/");
      this.showMessage({
        title: "提示",
        message: "退出登录成功",
      });
    },
  },
};
</script>
<style></style>
