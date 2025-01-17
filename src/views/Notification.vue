<template>
  <modal
    :show="show"
    :show-close="false"
    modal-classes="modal-dialog-centered"
    @close="handleClose"
  >
    <h6 id="modal-title-default" slot="header" class="modal-title">
      {{ title }}
    </h6>

    <p class="mb-4">{{ message }}</p>

    <div v-if="config" class="d-flex justify-content-end">
      <base-button
        v-if="config.showConfirm"
        class="mr-3"
        type="primary"
        @click="handleConfirm"
      >
        {{ config.confirmText || "确定" }}
      </base-button>
      <base-button
        v-if="config.showCancel"
        class="mr-3"
        type="danger"
        @click="handleCancel"
      >
        {{ config.cancelText || "取消" }}
      </base-button>
      <base-button
        v-if="config.showClose"
        class="ml-auto"
        type="link"
        @click="handleClose"
      >
        {{ config.closeText || "关闭" }}
      </base-button>
    </div>
    <div v-else class="d-flex justify-content-end">
      <base-button class="ml-auto" type="link" @click="handleClose">
        关闭
      </base-button>
    </div>
  </modal>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Modal from "@/components/Modal.vue";

export default {
  name: "Notification",
  components: {
    Modal,
  },
  computed: {
    ...mapState("modal", ["show", "title", "message", "config"]),
  },
  methods: {
    ...mapMutations("modal", ["HIDE_MODAL"]),
    handleConfirm() {
      if (this.config && this.config.onConfirm) {
        this.config.onConfirm();
      }
      this.HIDE_MODAL();
    },
    handleCancel() {
      if (this.config && this.config.onCancel) {
        this.config.onCancel();
      }
      this.HIDE_MODAL();
    },
    handleClose() {
      if (this.config && this.config.onClose) {
        this.config.onClose();
      }
      this.HIDE_MODAL();
    },
  },
};
</script>
