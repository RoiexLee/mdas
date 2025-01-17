<template>
    <header class="header-global">
        <base-nav class="navbar-main" transparent type="" effect="light" expand>
            <router-link class="navbar-brand mr-lg-5" to="/">
                <span class="navbar-brand mr-lg-5">自动人格评测系统</span>
            </router-link>
            <ul class="navbar-nav align-items-lg-center ml-lg-auto">
                <template v-if="isAuthenticated()">
                    <li class="nav-item">
                        <router-link to="/profile" class="nav-link">
                            <i class="fa fa-user-circle"></i>
                            <span class="nav-link-inner--text">个人中心</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/collection" class="nav-link">
                            <i class="fa fa-database"></i>
                            <span class="nav-link-inner--text">采集数据</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link" @click.prevent="handleLogout">
                            <i class="fa fa-sign-out"></i>
                            <span class="nav-link-inner--text">退出</span>
                        </a>
                    </li>
                </template>
                <template v-else>
                    <li class="nav-item">
                        <router-link to="/register" class="nav-link">
                            <i class="fa fa-user-plus"></i>
                            <span class="nav-link-inner--text">注册</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link">
                            <i class="fa fa-user"></i>
                            <span class="nav-link-inner--text">登录</span>
                        </router-link>
                    </li>
                </template>
            </ul>
        </base-nav>

        <modal :show.sync="showModal" @close="handleModalClose">
            <template slot="header">
                <h6 class="modal-title">提示</h6>
            </template>
            <template slot="default">
                <p>{{ modalMessage }}</p>
            </template>
            <template slot="footer">
                <base-button type="info" @click="handleModalClose">关闭</base-button>
            </template>
        </modal>
    </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import Modal from "@/components/Modal.vue";
import api from "@/services/api";
import {mapGetters} from "vuex";

export default {
    components: {
        BaseNav,
        CloseButton,
        BaseDropdown,
        Modal
    },
    data() {
        return {
            showModal: false,
            modalMessage: ''
        };
    },
    methods: {
        ...mapGetters(["isAuthenticated"]),
        showMessage(message) {
            this.modalMessage = message;
            this.showModal = true;
        },
        handleModalClose() {
            this.showModal = false;
            this.modalMessage = '';
        },
        async handleLogout() {
            try {
                await api.auth.logout();
            } catch (error) {
            } finally {
                this.$store.commit('SET_TOKEN', null);
                this.showMessage('退出成功');
            }
        }
    }
};
</script>
<style>
</style>
