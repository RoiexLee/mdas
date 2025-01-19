<template>
  <section>
    <div v-if="loading" class="text-center mt-3 mb-3">
      <h3 class="text-muted">加载中</h3>
    </div>
    <video
      v-else
      ref="video"
      :controls="false"
      :src="videoUrl"
      autoplay
      class="text-center mt-3 mb-3"
      width="100%"
      @ended="updatePlayState(1)"
      @error="handleVideoError"
    ></video>
    <div class="text-center mt-3 mb-3">
      <base-button
        v-if="playState === 1 || isDev"
        type="primary"
        @click="$emit('finish')"
      >
        下一步
      </base-button>
    </div>
  </section>
</template>

<script>
import api from "@/services/api";
import { mapActions } from "vuex";

export default {
  name: "Watch",
  data() {
    return {
      videoSource: "resources/video/Stimulus2.mp4",
      playState: 0,
      loading: false,
      videoUrl: null,
      error: null,
    };
  },
  computed: {
    isDev() {
      return process.env.NODE_ENV === "development";
    },
  },
  methods: {
    ...mapActions("modal", ["showError"]),
    updatePlayState(state) {
      this.playState = state;
    },
    handleVideoError(event) {
      this.showError({
        title: "视频播放错误",
        message: "视频播放失败",
      });
    },
    async fetchVideoUrl() {
      try {
        this.loading = true;
        const response = await api.oss.getUrl(this.videoSource);

        if (
          response.status === 200 &&
          response.data &&
          response.data.code === 1
        ) {
          this.videoUrl = response.data.data;
        } else {
          await this.showError({
            title: "获取视频失败",
            message: "获取视频失败",
          });
        }
      } catch (error) {
        console.log("获取视频失败", error);
        await this.showError({
          title: "获取视频失败",
          message: "获取视频失败",
        });
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    await this.fetchVideoUrl();

    // 禁用右键菜单以防止下载视频
    this.$refs.video.addEventListener("contextmenu", (e) => e.preventDefault());

    // 监听空格键,防止暂停
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        e.preventDefault();
      }
    });
  },
};
</script>

<style scoped>
video::-webkit-media-controls-timeline {
  display: none;
}

video::-webkit-media-controls-play-button {
  display: none;
}

video::-webkit-media-controls-volume-slider {
  display: none;
}

video::-webkit-media-controls-mute-button {
  display: none;
}

video::-webkit-media-controls-current-time-display {
  display: none;
}

video::-webkit-media-controls-time-remaining-display {
  display: none;
}
</style>
