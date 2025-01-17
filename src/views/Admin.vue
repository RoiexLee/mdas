<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span v-for="n in 8" :key="n"></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-12">
          <card
            body-classes="px-lg-5 py-lg-5"
            class="border-0 mt-1 mb-1"
            header-classes="bg-white"
            shadow
          >
            <h1 class="text-center mb-3">用户管理</h1>

            <div class="search-bar mb-4">
              <base-input
                v-model="searchQuery"
                addon-left-icon="ni ni-zoom-split-in"
                placeholder="搜索姓名或学号"
                @input="filterUsers"
              >
              </base-input>
            </div>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th class="text-center">序号</th>
                    <th>学号</th>
                    <th>姓名</th>
                    <th>用户名</th>
                    <th>QQ</th>
                    <th>联系电话</th>
                    <th class="text-center">采集状态</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in paginatedUsers" :key="user.id">
                    <td class="text-center">{{ index + 1 }}</td>
                    <td>{{ user.studentId }}</td>
                    <td>{{ user.fullname }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.qq || "未填写" }}</td>
                    <td>{{ user.phone || "未填写" }}</td>
                    <td class="text-center">
                      <badge
                        :type="user.isCollected === 1 ? 'success' : 'warning'"
                      >
                        {{ user.isCollected === 1 ? "已完成" : "未完成" }}
                      </badge>
                    </td>
                  </tr>
                  <tr v-if="filteredUsers.length === 0">
                    <td class="text-center" colspan="8">
                      <h4 v-if="error" class="text-danger">{{ error }}</h4>
                      <h4 v-else-if="loading" class="text-muted">加载中...</h4>
                      <h4 v-else class="text-muted">暂无数据</h4>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- 分页组件 -->
              <div class="d-flex justify-content-between align-items-center mt-4">
                <div class="text-muted">
                  共 {{ totalUsers }} 条记录，每页 {{ pageSize }} 条
                </div>
                <base-pagination
                  v-model="currentPage"
                  :page-count="totalPages"
                  align="center"
                  class="pagination-nav"
                ></base-pagination>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from "@/services/api";
import { mapActions } from 'vuex';

export default {
  name: "Admin",
  data() {
    return {
      users: [],
      searchQuery: "",
      filteredUsers: [],
      loading: false,
      error: null,
      currentPage: 1,
      pageSize: 10,
      columns: [
        { field: "studentId", label: "学号" },
        { field: "fullname", label: "姓名" },
        { field: "username", label: "用户名" },
        { field: "qq", label: "QQ" },
        { field: "phone", label: "联系电话" },
        { field: "isCollected", label: "采集状态" },
      ],
    };
  },
  computed: {
    totalUsers() {
      return this.filteredUsers.length;
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.pageSize);
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredUsers.slice(start, end);
    },
  },
  watch: {
    filteredUsers() {
      this.currentPage = 1;
    },
  },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    ...mapActions('modal', ['showError', 'showMessage']),
    async fetchUsers() {
      try {
        this.loading = true;
        this.error = null;
        const response = await api.user.getUsers();

        if (response.data.code === 1) {
          this.users = response.data.data;
          this.filteredUsers = response.data.data;
          this.showMessage({
            title: '提示',
            message: "获取用户信息成功"
          });
        } else {
          this.error = response.data.msg || "获取用户信息失败";
          this.showError({
            title: '提示',
            message: response.data.msg || "获取用户信息失败"
          });
        }
      } catch (error) {
        this.error = error.message || "获取用户信息失败";
        this.showError({
          title: '错误',
          message: error.message || "获取用户信息失败"
        });
      } finally {
        this.loading = false;
      }
    },
    async filterUsers() {
      if (!this.searchQuery.trim()) {
        this.filteredUsers = this.users;
        return;
      }

      const query = this.searchQuery.toLowerCase();
      this.filteredUsers = this.users.filter(
        (user) =>
          (user.fullname && user.fullname.toLowerCase().includes(query)) ||
          (user.studentId && user.studentId.includes(query)) ||
          (user.username && user.username.toLowerCase().includes(query)),
      );
    },
  },
};
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
p {
  font-weight: 700 !important;
}
</style>
