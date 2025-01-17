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
          @click="playAudio"
        >
          回放录音
        </base-button>
      </div>
      <audio v-if="audioUrl" ref="audioPlayer"></audio>
      <div
        v-if="audioStatus"
        :class="[
          'alert',
          audioStatus.success ? 'alert-success' : 'alert-danger',
        ]"
      >
        {{ audioStatus.message }}
      </div>
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
          @click="playVideo"
        >
          回放录像
        </base-button>
      </div>
      <div class="video-container mt-3 mb-3">
        <video
          v-if="isRecordingVideo"
          ref="videoElement"
          :autoplay="true"
          :controls="!!videoUrl"
          :muted="true"
          class="video-preview"
          height="auto"
          playsinline
          width="100%"
        ></video>
      </div>
      <div
        v-if="videoStatus"
        :class="[
          'alert',
          videoStatus.success ? 'alert-success' : 'alert-danger',
        ]"
      >
        {{ videoStatus.message }}
      </div>
    </div>

    <!-- 测试结果 -->
    <div>
      <h3 class="mb-3">测试结果</h3>
      <div
        :class="allTestsPassed ? 'alert-success' : 'alert-warning'"
        class="alert"
      >
        <p>{{ allTestsPassed ? "设备测试通过！" : "请完成设备测试" }}</p>
        <p>
          音频测试:
          {{
            audioStatus ? (audioStatus.success ? "通过" : "未通过") : "未测试"
          }}
        </p>
        <p class="mb-0">
          视频测试:
          {{
            videoStatus ? (videoStatus.success ? "通过" : "未通过") : "未测试"
          }}
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
import RecordingService from '@/services/recordingService';

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
      recordingDuration: 5000,
    };
  },
  computed: {
    isDev() {
      return process.env.NODE_ENV === "development";
    },
    allTestsPassed() {
      return (
        this.isDev ||
        (this.audioStatus &&
          this.audioStatus.success &&
          this.videoStatus &&
          this.videoStatus.success)
      );
    },
  },
  methods: {
    async startAudioRecording() {
      try {
        this.isRecordingAudio = true;
        await this.recordingService.startAudioRecording(this.recordingDuration);
      } catch (error) {
        this.audioStatus = {
          success: false,
          message: error.message || "未知错误",
        };
        this.isRecordingAudio = false;
      }
    },

    async stopAudioRecording() {
      try {
        const result = await this.recordingService.stopRecording();
        this.audioUrl = result.url;
        this.audioStatus = {
          success: true,
          message: "音频测试成功！",
          url: this.audioUrl,
        };
      } catch (error) {
        this.audioStatus = {
          success: false,
          message: error.message || "未知错误",
        };
      } finally {
        this.isRecordingAudio = false;
      }
    },

    async startVideoRecording() {
      try {
        this.isRecordingVideo = true;
        this.videoUrl = null;
		await this.$nextTick();
        await this.recordingService.startVideoRecording(
          this.$refs.videoElement,
          this.recordingDuration
        );
      } catch (error) {
        this.videoStatus = {
          success: false,
          message: error.message || "未知错误",
        };
        this.isRecordingVideo = false;
      }
    },

    async stopVideoRecording() {
      try {
        const result = await this.recordingService.stopRecording(this.$refs.videoElement);
        this.videoUrl = result.url;
        this.videoStatus = {
          success: true,
          message: "视频测试成功！",
          url: this.videoUrl,
        };
      } catch (error) {
        this.videoStatus = {
          success: false,
          message: error.message || "未知错误",
        };
      } finally {
        this.isRecordingVideo = false;
      }
    },

    async playAudio() {
      const audioPlayer = this.$refs.audioPlayer;
      if (audioPlayer && this.audioUrl) {
        audioPlayer.src = this.audioUrl;
        try {
          await audioPlayer.play();
        } catch (error) {
          this.audioStatus = {
            success: false,
            message: "音频播放失败",
          };
        }
      }
    },

    async playVideo() {
      const videoElement = this.$refs.videoElement;
      if (videoElement && this.videoUrl) {
        videoElement.srcObject = null;
        videoElement.src = this.videoUrl;
        try {
          await videoElement.play();
        } catch (error) {
          this.videoStatus = {
            success: false,
            message: "视频播放失败",
          };
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
