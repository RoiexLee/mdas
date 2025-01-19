<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span v-for="n in 8" :key="n"></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <card
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
            header-classes="bg-white pb-5"
            shadow
            type="secondary"
          >
            <div class="text-center text-muted mb-4">
              <small>使用身份登录</small>
            </div>
            <form role="form" @submit.prevent="handleSubmit">
              <base-input
                v-model="formData.username"
                addon-left-icon="ni ni-hat-3"
                class="mb-3"
                placeholder="用户名"
              >
              </base-input>

              <base-input
                v-model="formData.password"
                addon-left-icon="ni ni-lock-circle-open"
                placeholder="密码"
                type="password"
              >
              </base-input>

              <div class="text-center">
                <base-button
                  :disabled="isSubmitting"
                  :loading="isSubmitting"
                  class="my-4"
                  type="primary"
                  @click="handleSubmit"
                >
                  {{ isSubmitting ? "登录中..." : "登录" }}
                </base-button>
              </div>
            </form>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from "@/services/api";
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
      isSubmitting: false,
    };
  },
  methods: {
    ...mapActions("modal", ["showMessage", "showError"]),
    validateForm() {
      const errors = [];

      if (!this.formData.username) {
        errors.push("用户名不能为空");
      }

      if (!this.formData.password) {
        errors.push("密码不能为空");
      }

      return errors;
    },
    async handleSubmit() {
      const errors = this.validateForm();
      if (errors.length > 0) {
        this.showError({
          title: "错误",
          message: errors[0],
        });
        return;
      }

      this.isSubmitting = true;
      try {
        const response = await api.auth.login(this.formData);

        if (
          response.status === 200 &&
          response.data &&
          response.data.code === 1
        ) {
          this.$store.commit("SET_TOKEN", response.data.data);
          this.showMessage({
            title: "提示",
            message: "登录成功",
            onClose: () => {
              const redirectPath = this.$route.query.redirect || "/collection";
              this.$router.replace(redirectPath);
            },
          });
        } else {
          this.showError({
            title: "错误",
            message: "登录失败",
          });
        }
      } catch (error) {
        console.log(error);
        this.showError({
          title: "错误",
          message: "登录失败",
        });
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>
