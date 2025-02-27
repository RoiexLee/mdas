<template>
  <section>
    <h1 class="text-center mb-3">设备测试</h1>

    <!-- 音频测试部分 -->
    <div>
      <h3 class="mb-3">音频测试</h3>
      <div class="mb-3">
        <p>点击「开始录音」按钮，任意录制一段音频。</p>
        <p>点击「结束录音」按钮，可以结束录音。</p>
        <p>录音完成之后点击「回放录音」按钮试听。</p>
      </div>
      <div class="d-flex align-items-center mb-3">
        <base-button
          :disabled="isRecordingAudio"
          type="primary"
          @click="startAudioRecording"
        >
          {{ isRecordingAudio ? "录音中..." : "开始录音" }}
        </base-button>
        <base-button
          :disabled="!isRecordingAudio"
          class="ml-3"
          type="info"
          @click="stopAudioRecording"
        >
          停止录音
        </base-button>
        <base-button
          :disabled="!audioUrl"
          class="ml-3"
          type="success"
          @click="replayAudio"
        >
          回放录音
        </base-button>
      </div>
      <audio v-if="audioUrl" ref="audioPlayer"></audio>
    </div>

    <!-- 视频测试部分 -->
    <div>
      <h3 class="mb-3">视频测试</h3>
      <div class="mb-3">
        <p>点击「开始录像」按钮，任意录制一段视频。</p>
        <p>点击「结束录像」按钮，可以结束录像。</p>
        <p>录像完成之后点击「回放录像」按钮试看。</p>
      </div>
      <div class="d-flex align-items-center mb-3">
        <base-button
          :disabled="isRecordingVideo"
          type="primary"
          @click="startVideoRecording"
        >
          {{ isRecordingVideo ? "录像中..." : "开始录像" }}
        </base-button>
        <base-button
          :disabled="!isRecordingVideo"
          class="ml-3"
          type="info"
          @click="stopVideoRecording"
        >
          停止录像
        </base-button>
        <base-button
          :disabled="!videoUrl"
          class="ml-3"
          type="success"
          @click="replayVideo"
        >
          回放录像
        </base-button>
      </div>
      <div class="video-container mt-3 mb-3">
        <video
          v-if="isRecordingVideo || videoUrl"
          ref="videoElement"
          :autoplay="true"
          :controls="!!videoUrl"
          :muted="isRecordingVideo"
          class="video-preview"
          height="auto"
          playsinline
          width="100%"
        ></video>
      </div>
    </div>

    <!-- 测试结果 -->
    <div>
      <h3 class="mb-3">测试结果</h3>
      <div class="alert" :class="allTestsPassed ? 'alert-success' : 'alert-warning'">
        <p>{{ allTestsPassed ? "设备测试通过！" : "请完成设备测试" }}</p>
        <p>
          音频测试:
          {{ audioStatus === null ? "未测试" : (audioStatus ? "通过" : "未通过") }}
        </p>
        <p class="mb-0">
          视频测试:
          {{ videoStatus === null ? "未测试" : (videoStatus ? "通过" : "未通过") }}
        </p>
      </div>
      <div class="text-center">
        <base-button
          :disabled="!allTestsPassed"
          type="primary"
          @click="startCollection"
        >
          开始采集
        </base-button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import RecordingService from "@/services/recordingService";

export default {
  name: "Test",
  data() {
    return {
      isRecordingAudio: false,
      isRecordingVideo: false,
      audioUrl: null,
      videoUrl: null,
      audioStatus: null,
      videoStatus: null,
      recordingService: new RecordingService(),
      recordingMaxDuration: 5000,
    };
  },
  computed: {
    isDev() {
      return process.env.NODE_ENV === "development";
    },
    allTestsPassed() {
      return this.isDev || (this.audioStatus && this.videoStatus);
    },
  },
  methods: {
    ...mapActions("modal", ["showMessage", "showError"]),

    async startAudioRecording() {
      try {
        this.isRecordingAudio = true;
        this.audioUrl = null;
        
        this.recordingService.setAutoStopCallback((result) => {
          this.audioUrl = result.url;
          this.audioStatus = true;
          this.isRecordingAudio = false;
          this.recordingService.setAutoStopCallback(null);
          this.showMessage({
            title: "提示",
            message: "录音成功",
          });
        });

        await this.recordingService.startAudioRecording(this.recordingMaxDuration);
      } catch (error) {
        this.audioStatus = false;
        this.isRecordingAudio = false;
        this.recordingService.setAutoStopCallback(null);
        this.showError({
          title: "错误",
          message: error.message || "开始录音失败",
        });
      }
    },

    async stopAudioRecording() {
      try {
        const result = await this.recordingService.stopRecording();
        this.audioUrl = result.url;
        this.audioStatus = true;
        this.showMessage({
          title: "提示",
          message: "录音成功",
        });
      } catch (error) {
        this.audioStatus = false;
        this.showError({
          title: "错误",
          message: error.message || "结束录音失败",
        });
      } finally {
        this.isRecordingAudio = false;
      }
    },

    async startVideoRecording() {
      try {
        this.isRecordingVideo = true;
        this.videoUrl = null;
        
        this.recordingService.setAutoStopCallback(async (result) => {
          this.videoUrl = result.url;
          this.videoStatus = true;
          this.isRecordingVideo = false;
          this.recordingService.setAutoStopCallback(null);
          this.showMessage({
            title: "提示",
            message: "录像成功",
          });
        });

        await this.$nextTick();
        await this.recordingService.startVideoRecording(
          this.$refs.videoElement,
          this.recordingMaxDuration,
        );
      } catch (error) {
        this.videoStatus = false;
        this.isRecordingVideo = false;
        this.recordingService.setAutoStopCallback(null);
        this.showError({
          title: "错误",
          message: error.message || "开始录像失败",
        });
      }
    },

    async stopVideoRecording() {
      try {
        const result = await this.recordingService.stopRecording(
          this.$refs.videoElement,
        );
        this.videoUrl = result.url;
        this.videoStatus = true;
        this.showMessage({
          title: "提示",
          message: "录像成功",
        });
      } catch (error) {
        this.videoStatus = false;
        this.showError({
          title: "错误",
          message: error.message || "结束录像失败",
        });
      } finally {
        this.isRecordingVideo = false;
      }
    },

    async replayAudio() {
      const audioPlayer = this.$refs.audioPlayer;
      if (audioPlayer && this.audioUrl) {
        audioPlayer.src = this.audioUrl;
        try {
          await audioPlayer.play();
        } catch (error) {
          this.showError({
            title: "错误",
            message: error.message || "回放录音失败",
          });
        }
      }
    },

    async replayVideo() {
      const videoElement = this.$refs.videoElement;
      if (videoElement && this.videoUrl) {
        videoElement.srcObject = null;
        videoElement.src = this.videoUrl;
        try {
          await videoElement.play();
        } catch (error) {
          this.showError({
            title: "错误",
            message: error.message || "回放录像失败",
          });
        }
      }
    },

    startCollection() {
      if (this.allTestsPassed) {
        this.$emit("finish");
      }
    },
  },
  beforeDestroy() {
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
    }
    if (this.videoUrl) {
      URL.revokeObjectURL(this.videoUrl);
    }
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
