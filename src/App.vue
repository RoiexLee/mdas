<template>
  <div id="app">
    <router-view name="header"></router-view>
    <main>
      <fade-transition :duration="250" mode="out-in" origin="center">
        <router-view />
      </fade-transition>
    </main>
    <router-view name="footer"></router-view>
    <notification></notification>
  </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
import Notification from "@/views/Notification.vue";

export default {
  components: {
    FadeTransition,
    Notification,
  },
};
</script>
