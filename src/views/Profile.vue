<template>
  <div class="profile-page">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
    <section class="section section-skew">
      <div class="container">
        <card class="card-profile mt--300" no-body shadow>
          <div class="px-4">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img
                      :src="avatarUrlText"
                      alt="avatar"
                      class="rounded-circle"
                    />
                  </a>
                </div>
              </div>
              <div
                class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center"
              >
                <div class="card-profile-actions py-4 mt-lg-0">
                  <base-button
                    class="mr-4"
                    size="sm"
                    type="info"
                    @click="copyInviteCode"
                  >
                    复制邀请码
                  </base-button>
                  <base-button
                    class="float-right"
                    size="sm"
                    type="default"
                    @click="handleLogout"
                  >
                    退出登录
                  </base-button>
                </div>
              </div>
              <div class="col-lg-4 order-lg-1">
                <div class="card-profile-stats d-flex justify-content-center">
                  <div>
                    <span class="heading">{{ roleText }}</span>
                    <span class="description">角色</span>
                  </div>
                  <div>
                    <span class="heading">{{ collectionStatusText }}</span>
                    <span class="description">采集状态</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-5">
              <h3>
                {{ profile.fullname || "未知" }} /
                {{ profile.username || "未知" }}
              </h3>
              <div class="h5">
                <badge pill type="default"
                  >学号：{{ profile.studentId || "未知" }}
                </badge>
                <badge pill type="primary"
                  >班级：{{ profile.classCode || "未知" }}
                </badge>
                <badge pill type="info">QQ：{{ profile.qq || "未知" }}</badge>
                <badge pill type="success"
                  >联系电话：{{ profile.phone || "未知" }}
                </badge>
              </div>
              <div class="h5">
                <badge pill type="warning"
                  >生日: {{ profile.birthDate || "未知" }}
                </badge>
                <badge pill type="danger">性别: {{ genderText }}</badge>
                <badge pill type="success"
                  >学历: {{ educationLevelText }}
                </badge>
                <badge pill type="info"
                  >职业: {{ profile.career || "未知" }}
                </badge>
                <badge pill type="primary">兴趣爱好: {{ hobbiesText }}</badge>
              </div>
            </div>
            <div class="mt-5 py-5 border-top text-center">
              <div class="row justify-content-center">
                <div class="col-lg-9">
                  注册时间: {{ profile.registerTime || "未知" }}
                </div>
              </div>
            </div>
          </div>
        </card>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import api from "@/services/api";

export default {
  name: "Profile",
  data() {
    return {
      profile: {
        id: "",
        studentId: "",
        username: "",
        fullname: "",
        classCode: "",
        role: 0,
        qq: "",
        gender: 0,
        educationLevel: 0,
        birthDate: "",
        phone: "",
        avatarUrl: "",
        career: "",
        hobbies: "",
        isCollected: 0,
        inviterCode: "",
        inviteCode: "",
        registerTime: "",
        collectionTime: "",
      },
      roleMap: {
        0: "管理员",
        1: "用户",
      },
      collectionStatusMap: {
        0: "未采集",
        1: "已采集",
      },
      genderMap: {
        male: "男性",
        female: "女性",
      },
      educationLevelMap: {
        0: "小学及以下",
        1: "初高中",
        2: "本科",
        3: "硕博研究生",
      },
    };
  },
  computed: {
    avatarUrlText() {
      return "avatar.jpg";
    },
    roleText() {
      return this.roleMap[this.profile.role] || "未知";
    },
    collectionStatusText() {
      return this.collectionStatusMap[this.profile.isCollected] || "未知";
    },
    genderText() {
      return this.genderMap[this.profile.gender] || "未知";
    },
    educationLevelText() {
      return this.educationLevelMap[this.profile.educationLevel] || "未知";
    },
    hobbiesText() {
      if (!this.profile.hobbies) {
        return "未知";
      }
      return this.profile.hobbies.split(",").join("、");
    },
  },
  methods: {
    ...mapActions("modal", ["showMessage", "showError"]),

    async getProfile() {
      try {
        const response = await api.auth.profile();
        if (
          response.status === 200 &&
          response.data &&
          response.data.code === 1
        ) {
          this.profile = response.data.data;
        } else {
          this.showError({
            title: "错误",
            message: "获取个人信息失败",
          });
        }
      } catch (error) {
        console.error("获取个人信息失败", error);
        this.showError({
          title: "错误",
          message: "获取个人信息失败",
        });
      }
    },

    copyInviteCode() {
      if (this.profile.inviteCode) {
        navigator.clipboard.writeText(this.profile.inviteCode).then(() => {
          this.showMessage({
            title: "成功",
            message: "复制邀请码成功",
          });
        });
      } else {
        this.showError({
          title: "错误",
          message: "邀请码不存在",
        });
      }
    },

    handleLogout() {
      this.$store.commit("CLEAR");
      this.$router.push("/");
      this.showMessage({
        title: "成功",
        message: "退出登录成功",
      });
    },
  },
  created() {
    this.getProfile();
  },
};
</script>
