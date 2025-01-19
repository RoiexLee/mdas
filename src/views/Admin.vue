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
                placeholder="搜索学号或者姓名"
                @input="filterUsers"
              >
              </base-input>
            </div>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th
                      v-for="column in columns"
                      :key="column.field"
                      @click="sortBy(column.field)"
                    >
                      {{ column.label }}
                      <span v-if="sortField === column.field" class="sort-icon">
                        {{ sortOrder === "asc" ? "↑" : "↓" }}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in sortedUsers" :key="user.id">
                    <td>{{ user.studentId || "未知" }}</td>
                    <td>{{ user.fullname || "未知" }}</td>
                    <td>{{ user.qq || "未知" }}</td>
                    <td>{{ user.phone || "未知" }}</td>
                    <td class="text-center">
                      <badge
                        :type="user.isCollected === 1 ? 'success' : 'warning'"
                      >
                        {{ user.isCollected === 1 ? "已完成" : "未完成" }}
                      </badge>
                    </td>
                    <td>{{ user.collectionTime || "未知" }}</td>
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
              <div
                class="d-flex justify-content-between align-items-center mt-4"
              >
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
import { mapActions } from "vuex";

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
      sortField: "studentId",
      sortOrder: "asc",
      columns: [
        { field: "studentId", label: "学号", sortable: true },
        { field: "fullname", label: "姓名", sortable: true },
        { field: "qq", label: "QQ", sortable: true },
        { field: "phone", label: "联系电话", sortable: true },
        { field: "isCollected", label: "采集状态", sortable: true },
        { field: "collectionTime", label: "采集时间", sortable: true },
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
    sortedUsers() {
      const users = this.paginatedUsers;
      if (!this.sortField) return users;

      return [...users].sort((a, b) => {
        let aValue = a[this.sortField];
        let bValue = b[this.sortField];

        if (this.sortField === "collectionTime") {
          aValue = aValue ? new Date(aValue).getTime() : 0;
          bValue = bValue ? new Date(bValue).getTime() : 0;
        } else {
          aValue = aValue || "";
          bValue = bValue || "";
        }

        if (this.sortOrder === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    },
  },
  watch: {
    filteredUsers() {
      this.currentPage = 1;
    },
  },
  async created() {
    await this.getUsers();
  },
  methods: {
    ...mapActions("modal", ["showError", "showMessage"]),
    async getUsers() {
      try {
        this.loading = true;
        this.error = null;
        const response = await api.user.getUsers();

        if (
          response.status === 200 &&
          response.data &&
          response.data.code === 1
        ) {
          this.users = response.data.data;
          this.filteredUsers = response.data.data;
          this.showMessage({
            title: "提示",
            message: "获取用户信息成功",
          });
        } else {
          this.error = "获取用户信息失败";
          this.showError({
            title: "错误",
            message: "获取用户信息失败",
          });
        }
      } catch (error) {
        this.error = "获取用户信息失败";
        console.log("获取用户信息失败", error);
        this.showError({
          title: "错误",
          message: "获取用户信息失败",
        });
      } finally {
        this.loading = false;
      }
    },
    filterUsers() {
      if (!this.searchQuery.trim()) {
        this.filteredUsers = this.users;
        return;
      }

      const query = this.searchQuery.toLowerCase();
      this.filteredUsers = this.users.filter(
        (user) =>
          (user.fullname && user.fullname.toLowerCase().includes(query)) ||
          (user.studentId && user.studentId.includes(query)),
      );
    },
    sortBy(field) {
      if (field === this.sortField) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortField = field;
        this.sortOrder = "asc";
      }
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
